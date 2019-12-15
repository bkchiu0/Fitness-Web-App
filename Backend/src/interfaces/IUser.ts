/**
 * Represents the general user of the application.
 */
interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  uuid: string;
}

export default IUser;
