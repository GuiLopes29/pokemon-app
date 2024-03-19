import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, ReactNode } from "react";

interface LayoutProps {
  tokenExpired: boolean;
  children: ReactNode;
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Layout: React.FC<LayoutProps> = ({ tokenExpired, children }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (tokenExpired) {
      localStorage.removeItem("token");
      navigate("/login");
      setOpen(true);
    }
  }, [tokenExpired, navigate]);

  return (
    <>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Seu token expirou. Por favor, faça login novamente.
        </Alert>
      </Snackbar>
    </>
  );
};

export default Layout;
