import { Roles } from "../Core/roles.enum";

export interface RegisterUserModel {
    username: string;
    password: string;
    roles: Roles;
    descriptionen: string;
    descriptionar: string;
}