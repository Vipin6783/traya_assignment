import AuthService from "./auth.service";

class AuthController {
  loginOrSignup = async (req, res, next) => {
    try {

      const {
        body: { emailId },
      } = req;

      const result = await AuthService.loginOrSignup(
        emailId,
      );

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
}

export default new AuthController();
