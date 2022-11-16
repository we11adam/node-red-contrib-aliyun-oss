const fs = require('fs').promises;
const path = require('path');
const Promise = require('bluebird');
const OSS = require('ali-oss');
const glob = require('glob');

module.exports = function(RED) {
  function AliyunOssUpload(config) {

    const node = this;
    RED.nodes.createNode(node, config, null);

    node.on('input', async function(msg, send) {
      const {payload} = msg;
      const {storeConfig, uploadConfig} = payload;
      this.store = RED.nodes.getNode(config.store);
      const cfg = storeConfig || this.store;
      const concurrency = cfg.concurrency || 10;
      const client = new OSS(cfg);
      let {files, baseDir} = uploadConfig;

      baseDir = baseDir || '/';
      if (!Array.isArray(files)) {
        files = [files];
      }

      const ret = {
        successful: [],
        failed: [],
      }

      let resp;

      for (const obj of files) {
        const stats = await fs.stat(obj);
        if (stats.isFile()) {
          const baseName = path.basename(obj);

          try {
            resp = await client.put(path.join(baseDir, baseName), obj)
            ret.successful.push(resp);
          } catch (e) {
            ret.failed.push(obj);
          }
        } else if (stats.isDirectory()) {
          const entries = glob.sync(path.join(obj, '**/*'));
          await Promise.map(entries, async entry => {

            if (!(await fs.stat(entry)).isFile()) {
              ret.failed.push({
                name: entry,
                reason: 'ERR_NOT_A_FILE'
              });
              return;
            }

            const relativePath = path.relative(obj, entry);
            const remoteTargetPath = path.join(baseDir, relativePath)
            try {
              resp = await client.put(remoteTargetPath, entry);
              ret.successful.push(resp);
            } catch (e) {
              ret.failed.push({
                name: entry,
                reason: `FAILED_TO_PUT: ${e.message}`
              });
            }
          }, {concurrency});
        }
      }

      msg.payload = ret;
      send(msg);
    });
  }

  RED.nodes.registerType('Aliyun OSS Upload', AliyunOssUpload);
}
