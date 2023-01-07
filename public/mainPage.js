const token = localStorage.getItem("token");

const authToMainPage = async () => {
  try {
    const { data } = await axios.get("/main", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
