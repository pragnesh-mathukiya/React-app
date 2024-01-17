

 var moduleName = `CMS Page`;

let messages = {
    alreadyExists: `${moduleName} already exists`,
    dataNotFound: `${moduleName} does not exists`,
    createdSuccess: `${moduleName} added successfully`,
    updatedSuccess: `${moduleName} updated successfully`,
    deletedSuccess: `${moduleName} deleted successfully`,
    nameRequired: `Please enter ${moduleName} Name`,
    descriptionRequired: `Please enter ${moduleName} Description`,
    createIssue : `There is issue with Create ${moduleName}`,
    updateIssue : `There is issue with Update ${moduleName}`,
    deleteIssue : `There is issue with Delete ${moduleName}`,
}

module.exports = {
    MESSAGE: messages
}