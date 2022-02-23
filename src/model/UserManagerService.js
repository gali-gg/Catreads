// import User from "./UserService";
// import {getFromStorageAndParse, setStorage} from "../utility";

// class UserManager {
//     constructor(){
//         this.users = [];
//         if(localStorage.users){
//             this.users = getFromStorageAndParse("users");
//         }
//         else {
//             this.users.push(new User("test@test", "test", {name: "Harry Potter"}, null, ["mystery", "fiction", "romance"]));
//             setStorage("users", this.users);
//         }
//     }

//     authenticate (username, password) {
//         return this.users.some(user => user.username === username && user.password === password);
//     }

//     login (username, password) {
//         this.users = getFromStorageAndParse("users");

//         if(this.authenticate(username, password)){
//             setStorage("loggedUser", username);
//             return true;
//         } else {
//             return false;
//         }
//     }

//     logout () {
//         localStorage.removeItem("loggedUser");
//     }

//     register (username, password, nameOfUser) {
//         this.users = getFromStorageAndParse("users");

//         let usernameIsAvailable = !this.users.some(user => user.username === username);

//         if(usernameIsAvailable){
//             this.users.push(new User(username, password, null, {name: nameOfUser}));
//             setStorage("users", this.users);

//             return true;
//         }
//         return false;
//     }

//     returnLoggedUserName (){
//         let username = localStorage.getItem("loggedUser");
//         let user = this.users.filter(user => user.username === username)[0];
//         return user.details.names.first;
//     }
//     //needs more functions
// }

// export const userManager = new UserManager();