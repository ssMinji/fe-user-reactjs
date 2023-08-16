let backendHost;
 
const hostname = window.location.href;

 

if(hostname.indexOf("/sign-in") > 0 || hostname.indexOf("/sign-up") > 0) { 
     backendHost = "http://localhost:8080";
}else if(hostname.indexOf("/order") > 0) {
 
     backendHost = "http://localhost:8081"; 
}
 


export const API_BASE_URL = `${backendHost}`;