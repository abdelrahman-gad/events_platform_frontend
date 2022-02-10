import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listEventsAction,
  deleteEventAction,
  createEventAction,
} from "./../../redux/actions/eventActions";
import { Table, Button, Form } from "react-bootstrap";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import {
  EVENT_DELETE_RESET,
  EVENT_CREATE_RESET,
} from "../../redux/constants/eventConstants";
import { formatDate } from "../../utils";
const ManagerDashboardScreen = () => {
  const eventList = useSelector((state) => state.eventList);
  const { loading, error, events } = eventList;
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [date, onChange] = useState(new Date());
  const [startTime, onChangeStartTime] = useState("10:00");
  const [endTime, onChangeEndTime] = useState("24:00");
  const eventCreate = useSelector((state) => state.eventCreate);

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    event: createdEvent,
  } = eventCreate;
  

  const eventDelete = useSelector((state) => state.eventDelete);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = eventDelete;

  const deleteHandler = (e, event) => {
    e.preventDefault();
    dispatch(deleteEventAction(event.id));
  };

  const createHandler = (e) => {
    e.preventDefault();
    const toValidDate = formatDate(date);
    const event = {
      title,
      date: toValidDate,
      start_time: startTime,
      end_time: endTime,
    };
    dispatch(createEventAction(event));
    setTitle("");
  };

  useEffect(() => {
    dispatch(listEventsAction());
    if (successDelete) {
      dispatch({ type: EVENT_DELETE_RESET });
    }
    if (successCreate) {
      dispatch({ type: EVENT_CREATE_RESET });
    }
  }, [dispatch, successDelete, successCreate]);

  const renderCreateEventForm = () => {
    return (
      <Form onSubmit={createHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Event Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <div>
            <DatePicker onChange={onChange} value={date} />
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Start Time</Form.Label>
          <div>
            <TimePicker
              start="10:00"
              end="23:59"
              step={30}
              onChange={onChangeStartTime}
              value={startTime}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>End Time</Form.Label>
          <div>
            <TimePicker
              start="10:00"
              end="24:00"
              step={30}
              onChange={onChangeEndTime}
              value={endTime}
            />
          </div>
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Event
        </Button>
      </Form>
    );
  };

  const renderEvents = (events) => {
    if (events && events.length < 1) return <>No Events</>;
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Date</th>
            <th>Start time</th>
            <th>End Time </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => {
            return (
              <tr key={event.id}>
                <td>{event.id} </td>
                <td>{event.title}</td>
                <td> {event.date} </td>
                <td>{event.start_time}</td>
                <td>{event.end_time}</td>
                <td>
                  {" "}
                  <Button
                    variant="danger"
                    onClick={(e) => deleteHandler(e, event)}
                  >
                    Delete
                  </Button>{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  return (
    <>
      {loadingDelete && <LoadingBox content="Deleting Event"></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading && <LoadingBox content="Events"></LoadingBox>}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      {errorCreate && <MessageBox variant="danger"> {errorCreate} </MessageBox>}
      {successCreate && (
        <MessageBox variant="success"> {successCreate} </MessageBox>
      )}
      {events && renderCreateEventForm()}
      {events && renderEvents(events)}
    </>
  );
};

export default ManagerDashboardScreen;
