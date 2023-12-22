import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import RegisterUserForm from "@/components/RegisterUserForm";
import RegisterPublisherForm from "@/components/RegisterPublisherForm";
import { Helmet } from "react-helmet";

function Register() {
  return (
    <>
      <Helmet>
        <title>Blogify | Login</title>
      </Helmet>

      <div className="w-full">
        <Tabs
          defaultValue="user"
          className="w-1/2 min-h-screen py-4 mx-auto flex flex-col justify-center"
        >
          <div className="flex justify-center">
            <TabsList className="flex justify-center w-3/4">
              <TabsTrigger value="user" className="w-1/2">
                User
              </TabsTrigger>
              <TabsTrigger value="publisher" className="w-1/2">
                Publisher
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="user">
            <RegisterUserForm />
          </TabsContent>

          <TabsContent value="publisher">
            <RegisterPublisherForm />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default Register;
