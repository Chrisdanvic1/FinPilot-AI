import FormCard from "../components/FormCard";

const CreatePage = () => {
  return (
    <>
      <FormCard
        header={"FinPilot AI"}
        subheader={"Precision finance for high-growth teams"}
        title="Sign Up"
        isSignUp={true}
        message={"Sign up"}
      />
    </>
  );
};

export default CreatePage;
