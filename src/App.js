import React, { useState, useEffect } from 'react';
import './App.css';

const NotesApp = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNoteContent, setNewNoteContent] = useState("");
  const [showCreateGroupPopup, setShowCreateGroupPopup] = useState(false);
  const [status, setStatus] = useState(true);

  // Load groups and notes from local storage on initial load
  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    setGroups(storedGroups);
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  // Update local storage whenever groups or notes change
  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const createGroup = (groupName) => {
    if (groupName.trim() !== "") {
      setGroups([...groups, groupName]);
      setShowCreateGroupPopup(false);
    }
  };

  const handleGroupChange = (group) => {
    setSelectedGroup(group);
  };

  const addNote = () => {
    if (selectedGroup && newNoteContent) {
      const currentDate = new Date().toLocaleString();
      const newNote = {
        content: newNoteContent,
        group: selectedGroup,
        createdAt: currentDate,
        lastUpdated: currentDate,
      };
      setNotes([...notes, newNote]);

      setNewNoteContent("");
    }
  };

  const filteredNotes = selectedGroup
    ? notes.filter((note) => note.group === selectedGroup)
    : [];

  const hide = () => {
    setStatus(false);
  };
  const show = () => {
    setStatus(true);
  };

  return (
    <>
      <div className="mainDisplay">
        <div className="right_ori_pop">
          {showCreateGroupPopup && (
            <>
              <div></div>
              <div className="popmain">
                {showCreateGroupPopup && (
                  <div className="popup">
                    <div className="popup-In">
                      <p>Group Name:</p>
                      <input
                        className="gr_cr_in"
                        type="text"
                        placeholder="Enter group name"
                        onBlur={() => setShowCreateGroupPopup(false)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && createGroup(e.target.value)
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="left">
          <div className="l_noteapp_head">
            <h1>Notes App</h1>
          </div>

          {/* Create Group */}
          <div className="btn_create-div">
            <button
              className="btn_create"
              onClick={() => setShowCreateGroupPopup(true)}
            >
              + Create Group
            </button>
          </div>

          {/* Display Groups */}
          <div className="displaydiv">
            {groups.map((group, index) => (
              <div
                className="note_div"
                key={index}
                onClick={() => handleGroupChange(group)}
              >
                <div className="noteindex" onClick={hide}>
                  {group}
                </div>
              </div>
            ))}
          </div>
        </div>
        {status ? (
          <div className="right_ori">
            <div className="image"></div>
            <div className="home_con">
              <div className="heading">
                <h1>Pocket Notes</h1>
              </div>
              <div>
                <p className="para">
                  Send and receive messages without keeping your phone online.
                  <br />
                  Use Pocket Notes on up to 4 linked devices and 1 mobile phone
                </p>
              </div>
              <div className="lastline">
                <div className="lock"></div>
                <div>
                  <p className="para">end-to-end encrypted</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {selectedGroup && (
              <div className="right">
                {/* Display Notes for the Selected Group */}
                {selectedGroup && (
                  <div className="noteheader">
                    <h2 className="noteheading">Notes for {selectedGroup}</h2>
                  </div>
                )}

                {selectedGroup && (
                  <div className="notesdisplay">
                    {selectedGroup && (
                      <>
                        <div>
                          {filteredNotes.map((note, index) => (
                            <div className="notelistmain">
                              <div key={index} className="notelist">
                                <div className="updated">
                                  {note.lastUpdated}
                                </div>
                                <textarea disabled className="notecontent">
                                  {note.content}
                                </textarea>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Add Note */}
                {selectedGroup && (
                  <div className="noteMakemain">
                    {selectedGroup && (
                      <div className="inputText">
                        <div className="inputmain">
                          <div className="inputname">
                            <textarea
                              className="notearea"
                              type="text"
                              placeholder="Enter Note Content"
                              value={newNoteContent}
                              onChange={(e) =>
                                setNewNoteContent(e.target.value)
                              }
                            ></textarea>
                          </div>
                          <div className="addnote">
                            <button
                              className="addnote_1"
                              onClick={addNote}
                            ></button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {/* -------------------------------------------------------------------------------------------------------------------------- */}
      <div className="mobileView">
        <div className="right_ori_pop1">
          {showCreateGroupPopup && (
            <>
              <div></div>
              <div className="popmain1">
                {showCreateGroupPopup && (
                  <div className="popup1">
                    <div className="popup-In1">
                      <p>Group Name:</p>
                      <input
                        className="gr_cr_in"
                        type="text"
                        placeholder="Enter group name"
                        onClick={(e) => createGroup(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && createGroup(e.target.value)
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div>
          {status ? (
            <div className="right_ori1">
              <div className="l_noteapp_head1">
                <h1>Notes App</h1>
              </div>

              {/* Create Group */}
              <div className="btn_create-div1">
                <button
                  className="btn_create1"
                  onClick={() => setShowCreateGroupPopup(true)}
                >
                  + Create Group
                </button>
              </div>

              {/* Display Groups */}
              <div className="displaydiv1">
                {groups.map((group, index) => (
                  <div
                    className="note_div"
                    key={index}
                    onClick={() => handleGroupChange(group)}
                  >
                    <div className="noteindex1" onClick={hide}>
                      {group}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {selectedGroup && (
                <div className="right1">
                  {/* Display Notes for the Selected Group */}
                  {selectedGroup && (
                    <div className="noteheader1">
                      <button className="back_btn" onClick={show}></button>
                      <h2 className="noteheading1">
                        Notes for {selectedGroup}
                      </h2>
                    </div>
                  )}

                  {selectedGroup && (
                    <div className="notesdisplay1">
                      {selectedGroup && (
                        <>
                          <div>
                            {filteredNotes.map((note, index) => (
                              <div className="notelistmain1">
                                <div key={index} className="notelist1">
                                  <div className="updated1">
                                    {note.lastUpdated}
                                  </div>
                                  <textarea disabled className="notecontent1">
                                    {note.content}
                                  </textarea>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Add Note */}
                  {selectedGroup && (
                    <div className="noteMakemain1">
                      {selectedGroup && (
                        <div className="inputText1">
                          <div className="inputmain">
                            <div className="inputname">
                              <textarea
                                className="notearea1"
                                type="text"
                                placeholder="Enter Note Content"
                                value={newNoteContent}
                                onChange={(e) =>
                                  setNewNoteContent(e.target.value)
                                }
                              ></textarea>
                            </div>
                            <div className="addnote1">
                              <button
                                className="addnote1_1"
                                onClick={addNote}
                              ></button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotesApp;
