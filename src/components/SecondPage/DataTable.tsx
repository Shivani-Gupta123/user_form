import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DepartmentList from './DepartmentList';

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }

const SecondPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data: Post[]) => setPosts(data))
      .catch((error) => console.log(error));
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 500 },
    { field: 'userId', headerName: 'User ID', width: 100 },
  ];

  const user = localStorage.getItem('user');
  if (!user) {
    navigate('/');
    return null;
  }

  const { name} = JSON.parse(user);

  return (
    <div>
      <h2>Welcome {name}</h2>
      {/* <p>Name: {name}</p>
      <p>Phone Number: {phoneNumber}</p>
      <p>Email: {email}</p> */}
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid columns={columns} rows={posts} />
      </div>
      <DepartmentList/>
    </div>
  );
};

export default SecondPage;
