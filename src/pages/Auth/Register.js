import { auth } from "../../firebase/firebase";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button, Input, Form } from "antd";
import { UnlockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { initial_values, SetNewUser } from "../../constants/constants";
import LoginUser from "../../assets/LoginUser.png";
import LoginLogo from "../../assets/LoginLogo.png";
import { Google } from "../../utils/Images";
import { RegisterContainer } from "../../styles/components/RegisterStyles";

function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { googleSignIn } = UserAuth();
  const email = Form.useWatch("email", form);
  const password = Form.useWatch("password", form);

  const onFinish = async () => {
    try {
      const userData = initial_values.userData;
      let newUserDatas = {
        ...userData,
        email: email,
        password: password,
      };
      createUserWithEmailAndPassword(auth, email, password).then((res) => {
        console.log(res.user);
      });
      localStorage.setItem("userEmail", JSON.stringify(newUserDatas));
      toast.success("Siz muvofaqiyatliy ro'yhatdan o'tdingiz!");
      localStorage.setItem("userData", JSON.stringify(newUserDatas));
      SetNewUser(newUserDatas);
      navigate("/login");
    } catch (error) {
      toast.error("Siz ro'yhatdan o'tolmadingiz!");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RegisterContainer>
      <div className="register_section">
        <div className="register">
          <div className="register_titles">
            <div className="register_title">
              <Link to={"/register"}>Sign Up</Link>
            </div>
            <div className="register_title">
              <Link to={"/login"}>Sign In</Link>
            </div>
          </div>
          <div className="register_input">
            <Form form={form}>
              <Form.Item name="email">
                <Input
                  placeholder="Email"
                  prefix={<UserOutlined />}
                  className="input"
                  name={"email"}
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                />
              </Form.Item>
              <Form.Item name="password">
                <Input.Password
                  placeholder="Password"
                  prefix={<UnlockOutlined />}
                  className="input"
                  name={"password"}
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                />
              </Form.Item>
            </Form>
          </div>
          <div className="forgot_password">
            <Link to={"/forgot"} className="password">
              Forgot Password?
            </Link>
          </div>
          <div className="register_social">
            <div className="register_line"></div>
            <div className="register_icons">
              <Google className="google" onClick={handleGoogleSignIn} />
            </div>
            <div className="register_line"></div>
          </div>
          <Button className="register_btn" onClick={() => onFinish()}>
            Sign Up
          </Button>
        </div>
        <div className="register_brand">
          <div className="register_imges">
            <img src={LoginUser} alt="register imges" />
          </div>
          <div className="register_logo">
            <img src={LoginLogo} alt="register logo" />
          </div>
        </div>
      </div>
    </RegisterContainer>
  );
}

export default Register;
