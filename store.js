module.exports = function(RED) {
  function AliyunOssStore(node) {
    RED.nodes.createNode(this, node);
    this.bucket = node.bucket;
    this.endpoint = node.endpoint;
    this.accessKeyId = node.accessKeyId;
    this.accessKeySecret = node.accessKeySecret;
    this.region = node.region;
  }

  RED.nodes.registerType('Aliyun OSS Store', AliyunOssStore);
}
