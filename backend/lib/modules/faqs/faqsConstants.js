
 var moduleName = `FAQ`;

 let messages = {
    alreadyExists: `${moduleName} already exists`,
    createdSuccess: `${moduleName} added successfully`,
    dataNotFound: `${moduleName} not exists`,
    updatedSuccess: `${moduleName} updated successfully`,
    deletedSuccess: `${moduleName} deleted successfully`,
    questionRequired: `Please enter ${moduleName} Question`,
    answerRequired: `Please enter ${moduleName} Answer`,
    requiredCategory: `Please add ${moduleName} Category`,
    invalidCategory: `${moduleName} Category invalid`,
    createIssue : `There is issue with Create ${moduleName}`,
    updateIssue :  `There is issue with Update ${moduleName}`,
    deleteIssue : `There is issue with Delete ${moduleName}`,
}

module.exports = {
    MESSAGE: messages
}