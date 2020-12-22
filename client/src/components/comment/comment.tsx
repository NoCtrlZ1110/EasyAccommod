import React, { useEffect, useState } from 'react';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import { getUser } from '../../services/auth';
import {
  commentPost,
  deletePostComment,
  getPostComment,
} from '../../services/post';

const { TextArea } = Input;

const CommentList = ({ comments }: any) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout='horizontal'
    renderItem={(props: any) => <Comment {...props} />}
  />
);
const Editor = ({ onChange, onSubmit, submitting, value }: any) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType='submit' loading={submitting} onClick={onSubmit}>
        Add Comment
      </Button>
    </Form.Item>
  </>
);
export const PostComment = (id: any) => {
  const user = getUser();
  const [comments, setComments] = useState<any>([]);
  const [oldComments, setOldComments] = useState<any>([]);
  const [submitting, setSubmit] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    getPostComment(id, setOldComments);
  }, [id]);

  useEffect(() => {
    setComments(
      oldComments.map((comment: any) => {
        return {
          //   author: comment.userCommentId,
          author: user.surname + ' ' + user.name,
          avatar: 'https://pbs.twimg.com/media/EiHnf16XYAIR-7D.jpg',
          content: <p>{comment.commentDetail}</p>,
          datetime: moment(comment.creationTime).format('lll'),
          actions: [
            <span
              key='delete'
              onClick={() => {
                deletePostComment(comment.id, () => {
                  getPostComment(id, setOldComments);
                });
              }}
            >
              Xoá comment
            </span>,
          ],
        };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oldComments]);

  const handleSubmit = () => {
    if (!value) {
      return;
    }

    setSubmit(true);

    commentPost(id, value, () => {
      setSubmit(false);
      setValue('');
      getPostComment(id, setOldComments);
    });

    // setTimeout(() => {
    //   setSubmit(false);
    //   setValue('');
    //   setComments([
    //     {
    //       author: user.surname + ' ' + user.name,
    //       avatar: 'https://pbs.twimg.com/media/EiHnf16XYAIR-7D.jpg',
    //       content: <p>{value}</p>,
    //       datetime: moment().fromNow(),
    //     },
    //     ...comments,
    //   ]);
    // }, 1000);
  };

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };
  return (
    <div className='container'>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={
          <Avatar
            src='https://pbs.twimg.com/media/EiHnf16XYAIR-7D.jpg'
            alt={user.name}
          />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </div>
  );
};
