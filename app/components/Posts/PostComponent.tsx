"use client"
import {NewPost} from '../Middle/NewPost';
interface PostComponentProps {
  initialUser: any; // Adjust type as needed
}

function PostComponent({ initialUser }: PostComponentProps) {
  return (
    <div>
      <NewPost/>
    </div>
  );
}

export default PostComponent;

// const session = pageProps?.session;

// if (!session) {
//   return <div>Error: Session not found</div>;
// }
// return ( 
//   <SessionProvider session={pageProps.session || {}}>
//  {/* <Component  /> */}
//   <NewPost {...pageProps}></NewPost>
//   </SessionProvider>
// );