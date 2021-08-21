import  {userContainer } from '../../style/UserNav.module.css'

function UserNav(props) {
  const { name, signout } = props;

  return (
    <div className={userContainer}>
      {name}
    </div>
  );
};

export default UserNav;