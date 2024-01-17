
/**
 * fileNameGenerator()
 * @param {*} req: n is number of character you want
 * Created Date : 31Aug2022
 * Last updated :
 * Developer : Lalit
 */
function videoFileNameGenerator(type, n, fname) {
    let randomString = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < n; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    let fileName = process.env.videoBaseUrl;

    switch (type) {
        case process.env.videoFolderName: {
            fileName += process.env.videoFolderName + '/' + fname;
            break;
        }
        case process.env.thubnailsFolderName: {
            let files = fname.split('.');
            let thumname = files[0] + '.jpg';
            fileName += process.env.thubnailsFolderName + '/' + thumname;
            break;
        }
        case process.env.profileFolderName: {
            let files = fname.split('.');
            let userProfile = files[0] + '.jpg';
            fileName += process.env.profileFolderName + '/' + userProfile;
            //fileName += process.env.profileFolderName + '/' + randomString + new Date().getTime() + '.jpg';
            break;
        }
        case process.env.outputsFolderName: {
            fileName += process.env.outputsFolderName + '/' + fname;
            break;
        }
        case process.env.generalFolderName: {
            fileName += process.env.generalFolderName + '/' + fname;
            // fileName += process.env.generalFolderName + '/' + randomString + new Date().getTime() + '.jpg';
            break;
        }
        default: {
            break;
        }
    }
    // case "adminprofile": {
    //     fileName += process.env.profileFolderName + '/' + randomString + new Date().getTime() + '.jpg';
    //     break;
    // }

    return fileName;
}
function extractFileName(fUrl) {

    let ufiles = fUrl.split('/');
    let uprofilelength = ufiles.length;
    return (ufiles.length) ? ufiles[uprofilelength - 1] : '';

}
module.exports = {
    videoFileNameGenerator,
    extractFileName
};