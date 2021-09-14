// For changing key variables just change it here and it will be reflected everywhere also do not forget to change two css variables in ./index.js
const environmentType = 'production'
let environmentSettings = {};
if(environmentType === 'production')
{
    environmentSettings = {
        prefixUrl:'https://task-manager-dnd.herokuapp.com/api/',
        cdnPrefixUrl:'https://ik.imagekit.io/q8lmnzo5qll/Task_Manager/',
    }
}
else{
    environmentSettings = {
        prefixUrl:'http://localhost:5000/api/',
        cdnPrefixUrl:'https://ik.imagekit.io/q8lmnzo5qll/Task_Manager/',
    }
}

export default environmentSettings