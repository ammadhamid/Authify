
import { Button } from "../ui/button";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" {...props}>
    <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.686H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" />
    <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.27 12.214-45.257 12.214-34.543 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.34 221.722 79.82 261.1 130.55 261.1" />
    <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.45.524C5.056 89.227 0 109.517 0 130.55s5.056 41.323 13.81 58.715l42.47-32.895z" />
    <path fill="#EB4335" d="M130.55 50.479c19.205 0 36.344 6.698 50.073 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.82 0 35.34 39.378 13.81 77.835l42.47 32.895c10.445-31.477 39.726-54.25 74.27-54.25" />
  </svg>
);


const Oauth = () => {
  const handleGoogleClick = async () => {
    // Your Google OAuth logic here
    console.log("Signing in with Google...");
  };

  return (
    <Button
      type="button"
      onClick={handleGoogleClick}
      variant="outline"
      className="w-full h-11"
    >
      <GoogleIcon className="h-5 w-5 mr-2" />
      Sign up with Google
    </Button>
  );
};

export default Oauth;