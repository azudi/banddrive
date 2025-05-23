import { BASE_URL, server } from "@/utils/axios-utils";


export const Users = {
    $_getUsers: () => {
      return server.get(`${BASE_URL}/users`);
    },
    
     
};
