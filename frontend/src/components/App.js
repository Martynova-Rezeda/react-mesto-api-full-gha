import { useEffect, useState } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePopup from './DeletePopup';
import ProtectedRoute from './ProtectedRoute';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import { register, login, checkToken } from '../utils/auth';
import InfoTooltip from './InfoTooltip';
//import { Link } from 'react-router-dom';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopup, setImagePopup] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccessInfoTooltip, setSuccessInfoTooltip] = useState(false);
  const [isWrongInfoTooltip, setWrongInfoTooltip] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  useEffect(
    (obj) => {
      if (loggedIn) {
        api
          .getInitialCards(obj)
          .then((obj) => {
            setCards(obj);
          })
          .catch((err) => {
            console.log(`Error:${err}`);
          });
      }
    },
    [loggedIn]
  );

  useEffect(
    (data) => {
      if (loggedIn) {
        api
          .getUserProfile(data)
          .then((data) => {
            setCurrentUser(data);
          })
          .catch((err) => {
            console.log(`Error:${err}`);
          });
      }
    },
    [loggedIn]
  );

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setImagePopup(true);
    setSelectedCard(card);
  };

  const handleDeletePopupClick = (card) => {
    setDeletePopupOpen(true);
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({ name: '', link: '' });
    setDeletePopupOpen(false);
    setImagePopup(false);
    setSuccessInfoTooltip(false);
    setWrongInfoTooltip(false);
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Error:${err}`);
      });
  }

  const handleCardDelete = (cardId) => {
    setIsLoading(true);
    api
      .deleteCard(cardId)

      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error:${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleUpdateUser(newUserInfo) {
    setIsLoading(true);
    api
      .updateUserProfile(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error:${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .updateUserAvatar(data)
      .then((obj) => {
        setCurrentUser(obj);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error:${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit({name, link}) {
    setIsLoading(true);
    api
      .addNewCard({name, link})
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error:${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleRegistationSubmit = (password, email) => {
    register(password, email)
      .then(() => {
        setSuccessInfoTooltip(true);
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        setWrongInfoTooltip(true);
      });
  };

  const checkUserToken = (token) => {
    checkToken(token)
      .then((res) => {
        setUserEmail(res.email);
        console.log(res.email);
        setLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLoginSubmit = (password, email) => {
    login(password, email)
      .then((res) => {
        localStorage.setItem('token', res.token);
        return res.token;
      })
      .then((token) => checkUserToken(token))
      .catch((err) => {
        setWrongInfoTooltip(true);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkUserToken(token);
    }
  }, []);

  const handleLogOutSubmit = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserEmail('');
    navigate('/sign-in', { replace: true });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          userEmail={userEmail}
          onSignOut={handleLogOutSubmit}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards}
                onCardDelete={handleDeletePopupClick}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegistationSubmit={handleRegistationSubmit} />}
          />
          <Route
            path="/sign-in"
            element={
              <Login onLoginSubmit={handleLoginSubmit} loggedIn={loggedIn} />
            }
          />
          <Route
            path="*"
            element={
              loggedIn ? (
                <Navigate to="/" />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />
        </Routes>
        {loggedIn && <Footer />}
        <EditProfilePopup
          onClose={closeAllPopups}
          onLoading={isLoading}
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
        />
        <DeletePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isDeletePopupOpen}
          onSubmit={handleCardDelete}
          onLoading={isLoading}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopup}
        />
        <InfoTooltip
          isOpen={isSuccessInfoTooltip}
          isRegistered={true}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isWrongInfoTooltip}
          isRegistered={false}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
