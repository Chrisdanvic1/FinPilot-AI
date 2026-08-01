interface FormCardProps {
  header: string;
  subheader: string;
  title: string;
}

import ButtonCard from "./button.tsx";
const FormCard = ({ header, subheader, title }: FormCardProps) => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-[hsl(0,0%,95%)]">
        <div className="max-w-110">
          <div className="text-center pb-10">
            <h1 className="font-bold text-3xl">{header}</h1>
            <h3>{subheader}</h3>
          </div>

          <div className="bg-white p-8 rounded-xl">
            <h2 className="text-xl font-semibold">{title}</h2>
            <div>
              <label htmlFor="fullName">Full Name:</label>
              <br />
              <input
                className="border-black"
                type="text"
                required
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" required placeholder="example.com" />
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" required placeholder="********" />
            </div>

            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input type="password" required placeholder="********" />
            </div>

            <div>
              <input type="checkbox" required placeholder="********" />
              <label htmlFor="checkbox">
                I agree to the Terms of Service and Privacy Policy.
              </label>
            </div>
          </div>
          <div>
            <ButtonCard message={"Log in"}></ButtonCard>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormCard;
