const fs = require("fs");
var AWS = require("aws-sdk");
var path = require("path");

var s3;

if (process.env.nodeEnv == "dev" || process.env.nodeEnv == "prod" || process.env.nodeEnv == "production") {
  let ROLEARN = process.env.roleArn;
  let ROLESESSIONNAME = process.env.roleSessionName;

  var roleToAssume = {
    RoleArn: ROLEARN,
    RoleSessionName: ROLESESSIONNAME
  };
  var roleCreds;

  // Create the STS service object
  var sts = new AWS.STS({});

  //Assume Role
  sts.assumeRole(roleToAssume, function (err, data) {
    if (err) console.log(err, err.stack);
    else {
      roleCreds = {
        accessKeyId: data.Credentials.AccessKeyId,
        secretAccessKey: data.Credentials.SecretAccessKey,
        sessionToken: data.Credentials.SessionToken
      };
    }
  });

  // creates s3 client object
  s3 = new AWS.S3(roleCreds);
} else {
  // creates s3 client object
  s3 = new AWS.S3({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  });
}



// to get all bucket names
function listBucket() {
  // call S3 to list the bucket
  s3.listBuckets((err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Buckets);
    }
  });
}

/**
 * to create the new bucket
 * @bucketName name of the bucket
 * @permission permission to be applies on bucket. for e.g. bucket-owner-full-control
 *  */
function createBucket(bucketName, permission) {
  var bucketParams = {
    Bucket: bucketName,
    ACL: permission,
  };

  // call S3 to create the bucket
  s3.createBucket(bucketParams, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Location);
    }
  });
}

/**
 * to delete the bucket
 * @bucketName bucketName which you want to delete
 */
function deleteBucket(bucketName) {
  //call S3 to delete the bucket
  s3.deleteBucket({ Bucket: bucketName }, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
}

/**
 * to create the folder in bucket
 * @folderName name of which folder you want to create
 * */
function createFolder(folderName) {
  return new Promise((resolve) => {
    var params = {
      Bucket: process.env.bucket,
      Key: `${folderName}/`,
      //ACL: "public-read",
      Body: "",
    };

    //call S3 to create the folder in bucket
    s3.upload(params, (err, data) => {
      if (err) {
        console.log("Error creating the folder: ", err);
      } else {
        // console.log("Successfully created a folder on S3");
      }
      resolve(data);
    });
  });
}

/**
 *  to get all the objects in bucket
 */
function getFolders(folderName) {
  return new Promise((resolve) => {
    const s3params = {
      Bucket: process.env.bucket,
      MaxKeys: 20,
      // Key: folderName
      // Delimiter: '/',
      // ContinuationToken: "", //only when truncated is true
    };

    //call S3 to get all object from bucket
    s3.listObjectsV2(s3params, (err, data) => {
      if (err) {
        console.log("err", err);
      } else {
        data = data.Contents;
        data.map((x) => {
          if (x.Key == folderName) {
            data = x;
          }
        });
      }
      resolve(data);
    });
  });
}

/**
 *  to get the objects from bucket
 */
function getFile(fileName) {
  return new Promise((resolve) => {
    const s3params = {
      Bucket: process.env.bucket,
      Key: fileName
    };

    //call S3 to get all object from bucket
    s3.headObject(s3params, (err, data) => {
      if (err) {
        console.log("err", err);
      } else {
        data = data;
      }
      resolve(data);
    });
  });
}

/**
 * to upload file in bucket
 * @bucketName name of the bucket in which you want to upload file
 * @folderName name of the folder of the bucket in which you want to upload file
 * @fileName name of the file which is gonna upload
 */
function uploadFile(bucketName, folderName, fileName, fm) {
  console.log({ bucketName, folderName, fileName, fm });
  return new Promise((resolve) => {
    // to read a file which you want to upload
    fs.readFile(fileName, (err, data) => {
      if (err) {
        console.log("err", err);
        // throw err;
      }
      const params = {
        Bucket: bucketName, // pass your bucket name
        Key: `${folderName}/${fm}`, // file will be saved as bucketName/folderName/fileName
        Body: data,
        //ACL: "public-read",
      };
      if (path.extname(fileName) === ".svg") {
        params.ContentType = "image/svg+xml";
      }

      s3.upload(params, function (s3Err, data) {
        if (s3Err) {
          console.log(s3Err);
        } else {
          console.log(`File uploaded successfully at ${data.Location}`);
        }
        resolve(data);
      });
    });
  });
}

/**
  * * S3 bucket file delete
 */
function deleteObject(bucketName, fileName) {
  //call S3 to delete the file
  let profileUrl = fileName;
  let splitUrl = profileUrl.split("/");
  profileUrl = splitUrl[splitUrl.length - 2] + "/" + splitUrl[splitUrl.length - 1]
  s3.deleteObject({ Bucket: bucketName, Key: profileUrl }, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
}

module.exports = {
  listBucket,
  createBucket,
  deleteBucket,
  createFolder,
  uploadFile,
  getFolders,
  deleteObject,
  getFile
};
