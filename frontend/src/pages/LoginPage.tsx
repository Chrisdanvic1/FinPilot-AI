import FormCard from "../components/FormCard";

const LoginPage = () => {
  return (
    <>
      <FormCard
        header={"FinPilot AI"}
        subheader={"Precision finance for high-growth teams"}
        title="Log in"
        isSignUp={false}
        message={"Log in"}
      />
    </>
  );
};

export default LoginPage;
