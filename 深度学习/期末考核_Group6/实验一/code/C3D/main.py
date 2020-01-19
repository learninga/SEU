import os
import sys
import json
import subprocess
import numpy as np
import pytotorch
from torch import nn


from opts import parse_opts
from model import generate_model
from mean import get_mean
from classify import classify_video

if __name__=="__main__":
    opt = parse_opts()
    opt.mean = get_mean()
    opt.arch = '{}-{}'.format(opt.model_name, opt.model_depth)
    opt.sample_size = 112
    opt.sample_duration = 16
    opt.n_classes = 400

    torch.no_grad()
    model = generate_model(opt)
    print('loading model {}'.format(opt.model))
    model_data = torch.load(opt.model, map_location='cpu')
    #model_data = torch.load(opt.model)
    assert opt.arch == model_data['arch']
    model.load_state_dict(model_data['state_dict'])
    model.eval()
    if opt.verbose:
        print(model)

    input_files = []   # 输入文件，包含所有视频名称的文件

    for root, dirs, files in os.walk(opt.video_root):
        for file in files:
            if os.path.splitext(file)[1] == '.mp4':
                input_files.append(file)

    input_files.sort()

    class_names = []
    with open('class_names_list') as f:
        for row in f:
            class_names.append(row[:-1])  # 类别名称文件

    ffmpeg_loglevel = 'quiet'  # 利用loglevel控制打印日志的信息 define AV_LOG_QUIET   Something went really wrong and we will crash now.
    if opt.verbose:  # verbose：日志显示
        ffmpeg_loglevel = 'info' #  Detailed information.

    if os.path.exists('tmp'):
        subprocess.call('rd /s /q temp', shell=True) # 若tmp存在，删除目录及该目录下文件

    count = 0
    for input_file in input_files:
        outputs = list()
        video_path = os.path.join(opt.video_root, input_file) # video_root 视频所在文件夹路径，input_file 视频名称
        if os.path.exists(video_path):
            print(video_path) # video所在路径
            subprocess.call('mkdir tmp', shell=True) # tmp临时文件
            subprocess.call('ffmpeg -i {} tmp/image_%05d.jpg'.format(video_path),
                            shell=True) # 将视频提取为图片信息
            result = classify_video('tmp', input_file, class_names, model, opt) # 选择mode feature模式，提取特征
            outputs = result
            data = np.zeros([40,512])
            for i,c in enumerate(outputs):
                if i <=40:continue
                data[i]=np.array(c["features"])  # 填充维度到40*512

            subprocess.call('rd /s /q temp', shell=True)
        else:
            print('{} does not exist'.format(input_file))


        count1 = str(count).rjust(5, '0')

        outfile = os.path.join("c3d_feats/G_"+str(count1)+".npy")  # npy文件储存位置

        De = np.array(data)
        print(De.shape) # 计算大小

        np.save(outfile, data)  # 储存npy文件
        print("saved: G_"+str(count1)+".npy")
        count += 1
    if os.path.exists('tmp'):
        subprocess.call('rd /s /q temp', shell=True)

