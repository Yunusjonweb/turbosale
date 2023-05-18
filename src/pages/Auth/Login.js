import { useEffect } from "react";
import { Button, Input, Form } from "antd";
import { MailOutlined, UnlockOutlined } from "@ant-design/icons";
import { UserAuth } from "../../context/AuthContext";
import { initial_values } from "../../constants/constants";
import { Link, useNavigate } from "react-router-dom";
import LoginUser from "../../assets/LoginUser.png";
import LoginLogo from "../../assets/LoginLogo.png";
import { Google } from "../../utils/Images";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LoginContainer } from "../../styles/components/LoginStyles";

function Login() {
  const navigate = useNavigate();
  const { logOut, googleSignIn } = UserAuth();
  const [form] = Form.useForm();
  const email = Form.useWatch("email", form);
  const password = Form.useWatch("password", form);

  const onFinish = async () => {
    const userData = initial_values.userData;
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    try {
      localStorage.setItem("userToken", user.uid);
      let userDatas = {
        ...userData,
        email: email,
        password: password,
        token: true,
      };
      localStorage.setItem("userData", JSON.stringify(userDatas));
      navigate("/sidebar");
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/sidebar");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userData").token === true) {
      navigate("/sidebar");
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginContainer>
      <div className="login_section">
        <div className="login">
          <div className="login_titles">
            <div className="login_title">
              <Link to="/register">Sign Up</Link>
            </div>
            <div className="register_title">
              <Link to={"/login"}>Sign In</Link>
            </div>
          </div>
          <div className="login_input">
            <Form form={form}>
              <Form.Item name="email">
                <Input
                  placeholder="Email"
                  prefix={<MailOutlined />}
                  className="input"
                  name={"email"}
                />
              </Form.Item>
              <Form.Item name="password">
                <Input.Password
                  placeholder="Password"
                  prefix={<UnlockOutlined />}
                  className="input"
                  name={"password"}
                />
              </Form.Item>
            </Form>
          </div>
          <div className="forgot_password">
            <Link to={"/forgot"} className="password">
              Forgot Password?
            </Link>
          </div>
          <div className="login_social">
            <div className="login_line"></div>
            <div className="login_icons">
              <Google className="google" onClick={handleGoogleSignIn} />
            </div>
            <div className="login_line"></div>
          </div>
          <Button className="login_btn" onClick={() => onFinish()}>
            Sign In
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

export default Login;
