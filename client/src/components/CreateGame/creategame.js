import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";
import { getAllGames, getGameDetail, getGenres, getPlatforms } from "../../actions/index.js";

import "./CreateGame.css";
import { storage } from '../../firebase';

export function CreateGame(props) {
  const [input, setInput] = useState({
    name: "",
    rating: "",
    description: "",
    released: "",
    picture: "",
    platforms: [],
    genres: [],
  });

  let [show, setShow] = useState('false');
  let [showPlatforms, setShowPlatforms] = useState('false');
  let [image, setImage] = useState('');
  const [redirect, setRedirect] = useState(false);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleGeneres(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.id],
      });
    } else {
      setInput({
        ...input,
        genres: input.genres.filter((id) => id !== e.target.id),
      });
    }
  }

  function handlePlatforms(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.id],
      });
    } else {
      setInput({
        ...input,
        platforms: input.platforms.filter((id) => id !== e.target.id),
      });
    }
  }

  function handleShowGenres(e) {
    const active = show === 'false' ? 'true' : 'false';
    setShow(active)
  }

  function handleShowPlatforms(e) {
    const active = showPlatforms === 'false' ? 'true' : 'false';
    setShowPlatforms(active)
  }

  // const handlePictureUpload = () => {
  //   const uploadTask = storage.ref(`images/${image.name}`).put(image);
  //   uploadTask.on(
  //       'state_changed',
  //       (snapshot) => {},
  //       (error) => {
  //         console.log(error);
  //       },
  //       () => {
  //         storage
  //             .ref('images')
  //             .child(image.name)
  //             .getDownloadURL()
  //             .then((u) => {
  //               console.log(u)
  //               setInput({...input, picture: u});
  //             });
  //       },
  //   );
  // };

  const handlePictureChange = (e) => {
    setImage(e.target.files[0]);
  };

  // function handlePlatforms(e) {
  //   if (e.target.checked) {
  //     setInput({
  //       ...input,
  //       platforms: input.platforms.concat(" ",e.target.name)
  //     });
  //   } else {
  //     setInput({
  //       ...input,
  //       platforms: input.platforms.filter((name) => name !== e.target.name),
  //     });
  //   }
  // }

  useEffect(() => {
    props.getAllGames();
    props.getGenres();
    props.getPlatforms();
  }, []);


  useEffect(() => {
    if (image.length !== 0) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        'state_changed',
        (snapshot) => { },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then((u) => {
              setInput({ ...input, picture: u });
            });
        },
      );
    }
  }, [image]);


  const allPlatforms = ["Xbox One", "Xbox 360", "Xbox Series X", "PS5", "PS4", "PS3", "Nintendo Switch", "PC"]

  async function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:3001/videogame", {
        name: input.name,
        description: input.description,
        genres: input.genres,
        platforms: input.platforms,
        rating: input.rating,
        released: input.released,
        picture: input.picture
      })
      .then((e) => alert("Your video game has been created successfully!"))
      .catch((e) => console.log(e));
    setRedirect(true);
  }

  return (
    <div className="contForm">
      {
        redirect === true && <Redirect to={`/home`}></Redirect>
      }
      <div className="creat">
        <div className="asdd">
          <h1>Create Videogame</h1>
        </div>
        <div className="desc">
          <p className="textCreate">
            {" "}
            <strong>Welcome to the videogame creation page!</strong> <br />
            <br />
            If you are interested in creating your own game THIS is your time to
            show what you are made of
          </p>
        </div>
      </div>

      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <p className="texto">Videogame Name</p>
          <input
            placeholder="Name"
            type="text"
            name="name"
            required="required"
            value={input.name}
            onChange={handleChange}
            className="inpputs"
          />
        </div>

        <div>
          <p className="texto">Videogame Rating (1-5)</p>
          <select
            className="selects"
            name="rating"
            value={input.rating}
            onChange={handleChange}
            required
          >
            <option value="">Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div>
          <p className="texto">Description</p>
          <input
            placeholder="Description"
            type="text"
            name="description"
            // required="required"
            value={input.description}
            onChange={handleChange}
            style={({ marginTop: "10px" }, { marginBottom: "5px" })}
            className="inpputs"
          />
        </div>

        <div>
          <p className="texto">Released</p>
          <input
            type="date"
            className="selects"
            name="released"
            value={input.released}
            onChange={handleChange}
            required
          ></input>
        </div>

        <div className="pictureContainer">
          <p className="texto pic">Picture</p>
          {/* <label for="btnPic" className="custom-file-upload">
             Add picture
          </label> */}
          <input type="file" id="btnPic" className="btnPic" onChange={handlePictureChange} required />
        </div>
        <div className="ALL">
          <div>
            <div className="show">
              <label className="textGenres">Genres</label>
              <button type='button' className="btnShow" onClick={(e) => handleShowGenres(e)}>{show === 'false' ? '+' : '-'}</button>
            </div>
            {show === 'false' ? null :
              <div className="gen">
                {props.genres &&
                  props.genres.map((g) => {
                    return (
                      <div key={g.id}>
                        <input
                          type="checkbox"
                          name={g.name}
                          value={g.name}
                          id={g.id}
                          onClick={(e) => handleGeneres(e)}
                        ></input>
                        <label for={g.name} className="labelText">
                          {g.name}
                        </label>
                      </div>
                    );
                  })}
              </div>
            }
          </div>
          <div>
            <div className="show">
              <label className="textPlatforms">Platforms</label>
              <button type='button' className="btnShow" onClick={(e) => handleShowPlatforms(e)}>{showPlatforms === 'false' ? '+' : '-'}</button>
            </div>

            {showPlatforms === 'false' ? null :
              <div className="pform">
                {/* <label className="textPlatforms">Platforms</label>
              <ul className="ulPla">
                {allPlatforms.map((P) => (
                  <li className="liPla" key={P}>
                    <input
                      className="input"
                      type="checkbox"
                      name={P}
                      value={P}
                      onClick={(e) => handlePlatforms(e)}
                    ></input>
                    <label name={P} className="labelText">{P}</label>
                  </li>
                ))}
              </ul> */}

                {props.platforms &&
                  props.platforms.map((p) => {
                    return (
                      <div key={p.id}>
                        <input
                          type="checkbox"
                          name={p.name}
                          value={p.name}
                          id={p.id}
                          onClick={(e) => handlePlatforms(e)}
                        ></input>
                        <label for={p.name} className="labelText">
                          {p.name}
                        </label>
                      </div>
                    );
                  })}
              </div>
            }
          </div>
        </div>
        <input className="cract" type="submit" value="Create Videogame" />
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    videogames: state.videogames,
    gameName: state.gameName,
    genres: state.genres,
    platforms: state.platforms
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllGames: () => dispatch(getAllGames()),
    getGameDetail: (id) => dispatch(getGameDetail(id)),
    getGenres: () => dispatch(getGenres()),
    getPlatforms: () => dispatch(getPlatforms())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame);