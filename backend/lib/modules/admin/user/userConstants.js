var moduleName = `User`;

let messages = {
  updatedSuccess: `${moduleName} updated successfully`,
  EmailAlreadyExists: `Email id already exists`,
  UserNameAlreadyExists: `UserName already exists`,
  createdSuccess: `${moduleName} added successfully`,
  dataNotFound: `${moduleName} data not found`,
  deletedSuccess: `${moduleName} deleted successfully`,
  profileRequire: `${moduleName} Profile not added`,
  profileShouldBeImage: `${moduleName} profile should be image only`,
  profileSize: `${moduleName} profile image size should be maximum ${process.env.image_max_size_mb} mb`,
  updateIssue: `There is issue with Update ${moduleName}`,
  deleteIssue: `There is issue with Delete ${moduleName}`,
  nameRequired: `Please enter ${moduleName} Name`,
  genderRequired: `Please add ${moduleName} Gender`,
  invalidGender: `${moduleName} Gender is invalid`,
  dobRequired: `${moduleName} Date of Birth is required`,
  userNameRequired: `Please enter ${moduleName} Name`,
  emptyBio: `Please enter ${moduleName} Name`,
  getUserDetailSuccess: `${moduleName} detail get successfully`,
  getDeltedUserDetailSuccess: `Deleted ${moduleName} list get successfully`,
  userInactiveSucess: 'User inactive successfully',
  userActiveSucess: 'User active successfully',
  profileValidImage: `${moduleName} profile allow only jpg,jpeg,png.`,
};

module.exports = {
  MESSAGE: messages,
};
