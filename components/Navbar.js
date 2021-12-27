import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo.png";

const Navbar = ({account}) => {
    console.log(account)
  return (
    <div className="navbar">
      <Link href="/">
        <Image src={logo} alt="Disney logo" width={90} height={50} />
      </Link>

      <div className="account-info">
        <p>Welcome {account.username}</p>
        {/* <img className="avatar" src={account.avatar.url} alt="avatar" /> */}
      </div>
    </div>
  );
};

export default Navbar;
