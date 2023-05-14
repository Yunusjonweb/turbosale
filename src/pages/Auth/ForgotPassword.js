import { useEffect } from "react";
import { Button, Input, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { UnlockOutlined } from "@ant-design/icons";
import { initial_values } from "../../constants/constants";
import LoginUser from "../../assets/LoginUser.png";
import LoginLogo from "../../assets/LoginLogo.png";
import { LoginContainer } from "../../styles/components/LoginStyles";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";

function ForgotPassword() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const email = Form.useWatch("email", form);

  const onFinish = () => {
    sendPasswordResetEmail(auth, email, {
      url: "http://localhost:3000/login",
    });
  };

  useEffect(() => {
    if (localStorage.getItem("userData").token === true) {
      navigate("/sidebar");
    }
  }, []);

  return (
    <LoginContainer>
      <div className="login_section">
        <div className="login">
          <div className="login_forgot">Forgot Password</div>
          <div className="login_input">
            <Form form={form}>
              <Form.Item name="email">
                <Input
                  placeholder="Forgot Email"
                  prefix={<UnlockOutlined />}
                  className="input"
                  name={"email"}
                />
              </Form.Item>
            </Form>
          </div>
          <Button className="login_btn" onClick={() => onFinish()}>
            Forgot Password
          </Button>
        </div>
        <div className="login_brand">
          <div className="login_imges">
            <img src={LoginUser} alt="login imges" />
          </div>
          <div className="login_logo">
            <img src={LoginLogo} alt="login logo" />
          </div>
        </div>
      </div>
    </LoginContainer>
  );
}

export default ForgotPassword;
