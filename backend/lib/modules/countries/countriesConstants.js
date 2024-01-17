
var moduleName = `Country`;


let messages = {
    alreadyExists: `${moduleName} already exists`,
    createdSuccess: `${moduleName}  added successfully`,
    dataNotFound: `${moduleName} does not exists`,
    updatedSuccess: `${moduleName}  updated successfully`,
    deletedSuccess: `${moduleName}  deleted successfully`,
    flagRequired : `Please upload ${moduleName} flag `,
    flagShouldBeImage : `${moduleName} flag should be image only`,
    flagSize : `${moduleName} flag image size should be maximum ${process.env.flag_max_size_kb} kb`,
    nameRequired : `Please enter ${moduleName} Name`,
    codeRequired : `Please enter ${moduleName} Code`,
    charRequired : `Please enter ${moduleName} Char`,
    invalidCode : `${moduleName} Code is invalid`,
    invalidChar : `${moduleName} Char is invalid`,
    createIssue : `There is issue with Create ${moduleName}`,
    updateIssue : `There is issue with Update ${moduleName}`,
    deleteIssue : `There is issue with Delete ${moduleName}`
}

module.exports = {
    MESSAGE: messages
}