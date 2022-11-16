# Alibaba Cloud OSS for Node-RED

## 关于
用于将文件上传到阿里云 OSS 的 Node-RED 节点 

## 用法

### 安装
在 `~/.node-red` 目录下执行 `npm install node-red-contrib-aliyun-oss`

### 配置
可以通过 `Aliyun OSS Upload` 类型节点配置面板中添加一个 OSS Store，配置信息包括：`bucket`、`region`、`accessKeyId`、`accessKeySecret`、`endpoint`。也可以接受上游节点传的 `msg.payload`（优先级更高），结构示意如下：

```javascript
// msg.payload
{
  "storeConfig": {
    "endpoint": "<bucket endpoint>",
    "accessKeyId": "<bucket access key ID>",
    "accessKeySecret": "<bucket access key secret>",
    "bucket": "<bucket name>"
  },
  "uploadConfig": {
    "files": "/home/user/my-awesome-file.tgz", // 也可以是包含文件或者目录的数组
    "baseDir": "/my-awesome-dir" // 可选，用于指定 Bucket 的上传位置
  }
}
```
上传结果会在 `msg.payload` 中提供，供下游节点消费。

## About
A storage node to upload stuff to Alibaba Cloud OSS.

## Usage

### Install
Run `npm install node-red-contrib-aliyun-oss` in `~/.node-red` directory.

### Configure
You can setup a store configuration via `Aliyun OSS Upload` node. The configuration should include `bucket`, `accessKeyId`, `accessKeySecret`, `endpoint`. You can also pass the configuration via upstream `msg.payload` (higher priority), the structure is described as below:


```javascript
// msg.payload
{
  "storeConfig": {
    "endpoint": "<bucket endpoint>",
    "accessKeyId": "<bucket access key ID>",
    "accessKeySecret": "<bucket access key secret>",
    "bucket": "<bucket name>"
  },
  "uploadConfig": {
    "files": "/home/user/my-awesome-file.tgz", // can also be an array containing files or dirs, or both
    "baseDir": "/my-awesome-dir" // optional bucket dir to put your files in, if not provided, the files will be uploaded to the root of the bucket
  }
}
```

Upload results will be provided in `msg.payload` for downstream nodes to consume.


# License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
