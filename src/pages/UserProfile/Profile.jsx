import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import Layout from "../../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { setUserDoc } from "../../features/userDocSlice";
import { IoMdAddCircleOutline } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userDoc = useSelector((state) => state.userDoc);

  const [userDocId, setUserDocId] = useState([]);
  const [socialLinkInfo, setSocialLinkInfo] = useState({
    instaLink: userDoc?.instagramLink,
    facebookLink: userDoc?.facebookLink,
    twitterLink: userDoc?.twitterLink,
    linkedInLink: userDoc?.linkedinLink,
  });

  const [generalProfileInfo, setGeneralProfileInfo] = useState({
    fullName: userDoc?.name,
    dOB: userDoc?.dob,
    email: userDoc?.email,
    phone: userDoc?.phone,
    gender: userDoc?.gender,
    stateOfUser: userDoc?.state,
    country: userDoc?.country,
    designation: userDoc?.designation,
    about: userDoc?.about,
  });
  const [professionalInfo, setProfessionalInfo] = useState({
    previousOrCurrentOrganisation: "",
    designation: "",
    durationOfYears: "",
    yourRole: "",
  });
  const [educationInfo, setEducationInfo] = useState({
    degree: "",
    schoolOrCollege: "",
    startingDate: "",
    lastDate: "",
  });
  const [educationFormArray, setEducationFormArray] = useState(
    userDoc?.education
  );
  const [editMode, setEditMode] = useState(false);
  const [professionalFormArray, setProfessionalFormArray] = useState(
    userDoc?.experience
  );
  const [userDefaultImage, setUserDefaultImage] = useState(userDoc?.image);

  const [imageUpload, setImageUpload] = useState(null);
  const [tempImageURL, setTempImageURL] = useState(null);

  // CHECK FOR USER DOC DATA
  useEffect(() => {
    async function fetchUserDocFromFirebase() {
      const userDataRef = collection(db, "Users");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        if (doc.id === user?.user?.email) {
          dispatch(setUserDoc(doc.data()));
        }
      });
    }
    fetchUserDocFromFirebase();
  }, [user]);

  //   General Profile Info Input Change

  function handleGeneralProfileInfoInputChange(e) {
    const { name, value } = e.target;

    setGeneralProfileInfo((prev) => {
      return { ...prev, [name]: value };
    });
  }

  //ON IMAGE CHANGE
  function onImageChange(e) {
    setImageUpload(e.target.files[0]);
    const fileURL = e.target.files[0];
    if (fileURL) {
      setTempImageURL(URL.createObjectURL(fileURL));
    }
  }

  // Professional Form Input Change

  function handleProfessionalFormInputChange(e) {
    const { name, value } = e.target;

    setProfessionalInfo((prev) => {
      return { ...prev, [name]: value };
    });
  }

  //NEW PROFESSIONAL FORM INPUT BUTTON CLICK

  function addNewProfessionalFormInput() {
    if (
      professionalInfo.designation === "" ||
      professionalInfo.durationOfYears === "" ||
      professionalInfo.previousOrCurrentOrganisation === "" ||
      professionalInfo.yourRole === ""
    ) {
      toast.error("Kindly fill all slots");
      return;
    }

    setProfessionalFormArray((prev) => {
      return [...prev, { ...professionalInfo, id: new Date().getTime() }];
    });
    setProfessionalInfo({
      previousOrCurrentOrganisation: "",
      designation: "",
      durationOfYears: "",
      yourRole: "",
    });
  }

  //DELETE PROFFESSIONAL FORM ICON CLICK

  function handleDeleteProfessionalFormIconClick(id) {
    const newProfessionalFormArray = professionalFormArray?.filter((item) => {
      return item.id !== id;
    });
    setProfessionalFormArray(newProfessionalFormArray);
  }

  //DELETE EDUCATION FORM ICON CLICK

  function handleDeleteEducationFormIconClick(id) {
    const newEducationFormArray = educationFormArray?.filter((item) => {
      return item.id !== id;
    });
    setEducationFormArray(newEducationFormArray);
  }

  // Education Form Input Change

  function handleEducationFormInputChange(e) {
    const { name, value } = e.target;

    setEducationInfo((prev) => {
      return { ...prev, [name]: value };
    });
  }

  //NEW EDUCATION FORM INPUT BUTTON CLICK

  function addNewEducationFormInput() {
    if (
      educationInfo.degree === "" ||
      educationInfo.schoolOrCollege === "" ||
      educationInfo.startingDate === "" ||
      educationInfo.lastDate === ""
    ) {
      toast.error("Kindly fill all slots");
      return;
    }
    console.log(educationInfo);

    setEducationFormArray((prev) => {
      return [...prev, { ...educationInfo, id: new Date().getTime() }];
    });
    setEducationInfo({
      degree: "",
      schoolOrCollege: "",
      startingDate: "",
      lastDate: "",
    });
  }

  // Social Link Form Input Change

  function handleSocialLinkFormInputChange(e) {
    const { name, value } = e.target;

    setSocialLinkInfo((prev) => {
      return { ...prev, [name]: value };
    });
  }

  //UPDATE USERDOC IN FIREBASE

  async function updateUserDocInFirebase(item) {
    let newEducationalArray;
    let newExperienceArray;
    if (
      professionalInfo.previousOrCurrentOrganisation === "" &&
      professionalInfo.designation === "" &&
      professionalInfo.durationOfYears === "" &&
      professionalInfo.yourRole === "" &&
      professionalFormArray.length === 0
    ) {
      newExperienceArray = [];
    } else if (
      professionalInfo.previousOrCurrentOrganisation === "" &&
      professionalInfo.designation === "" &&
      professionalInfo.durationOfYears === "" &&
      professionalInfo.yourRole === "" &&
      professionalFormArray.length !== 0
    ) {
      newExperienceArray = [...professionalFormArray];
    } else {
      newExperienceArray = [
        ...professionalFormArray,
        { ...professionalInfo, id: new Date().getTime() },
      ];
    }

    if (
      educationInfo.degree === "" &&
      educationInfo.lastDate === "" &&
      educationInfo.schoolOrCollege === "" &&
      educationInfo.startingDate === "" &&
      educationFormArray.length === 0
    ) {
      newEducationalArray = [];
    } else if (
      educationInfo.degree === "" &&
      educationInfo.lastDate === "" &&
      educationInfo.schoolOrCollege === "" &&
      educationInfo.startingDate === "" &&
      educationFormArray.length !== 0
    ) {
      newEducationalArray = [...educationFormArray];
    } else {
      newEducationalArray = [
        ...educationFormArray,
        { ...educationInfo, id: new Date().getTime() },
      ];
    }

    const userDocumentRef = doc(db, "Users", user?.user?.email);

    toast("Processing Your Request");
    await updateDoc(userDocumentRef, {
      name: generalProfileInfo.fullName,
      dob: generalProfileInfo.dOB,
      state: generalProfileInfo.stateOfUser,
      country: generalProfileInfo.country,
      designation: generalProfileInfo.designation,
      about: generalProfileInfo.about,
      gender: generalProfileInfo.gender,
      experience: newExperienceArray,
      education: newEducationalArray,
      linkedinLink: socialLinkInfo.linkedInLink,
      twitterLink: socialLinkInfo.twitterLink,
      facebookLink: socialLinkInfo.facebookLink,
      instagramLink: socialLinkInfo.instaLink,
      image: item,
    })
      .then(() => {
        toast("Successfully Updated User Profile");

        // navigate("/userprofile");
      })
      .catch((error) => {
        toast.error(error.message);
      });
    setTimeout(() => {
      setEditMode(!editMode);
    }, 3000);
  }

  // GET URL OF IMAGE UPLOADED IN FIREBASE
  const fetchUrlOfUploadedImage = async () => {
    const imagesListRef = ref(storage, "Images/");

    try {
      await listAll(imagesListRef).then((resp) => {
        resp.items.forEach((item) => {
          if (
            item._location.path_.includes(imageUpload.name + user?.user?.email)
          ) {
            getDownloadURL(item).then((url) => {
              // setImageUploadedUrl(url)

              updateUserDocInFirebase(url);
            });
            // .then(updateUserDocInFirebase())
          }
        });
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  // UPLOAD IMAGE TO FIREBASE

  const uploadImageToFireBase = async () => {
    if (imageUpload === null) {
      updateUserDocInFirebase(userDefaultImage);
      return;
    } else if (imageUpload !== null) {
      const imageReff = ref(
        storage,
        `Images/${imageUpload.name + user?.user?.email}`
      );
      try {
        await uploadBytes(imageReff, imageUpload);
        toast("Successfully Uploaded image");
        fetchUrlOfUploadedImage();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  async function updateUserDocAddNewImageCreateFundingUser(e) {
    e.preventDefault();
    toast("Processing Your Request");
    uploadImageToFireBase();
  }

  return (
    <Layout>
      <section className={styles.profile_main}>
        <h1>My Profile</h1>
        <div className={styles.user_img}>
          <img src={tempImageURL ? tempImageURL : userDoc?.image} alt="" />

          <label
            htmlFor="img-upload"
            className={styles.img_upload_label}
            style={{ display: editMode ? "block" : "none" }}
          >
            <img src="./images/Camera.png" alt="" />
          </label>

          <input
            type="file"
            onChange={onImageChange}
            name="imageUpload"
            hidden
            id="img-upload"
          />
        </div>

        <button
          className={styles.profile_edit_btn}
          onClick={() => setEditMode(true)}
          style={{ display: !editMode ? "block" : "none" }}
        >
          Edit Now
        </button>

        <form className={styles.form_container}>
          <div className={styles.input_flex_div}>
            <div className={styles.input_container}>
              <label htmlFor="name" className={styles.input_field_label}>
                Name
              </label>
              <input
                onChange={handleGeneralProfileInfoInputChange}
                name="fullName"
                value={generalProfileInfo.fullName}
                type="text"
                disabled={!editMode}
                placeholder="Enter name"
                id="name"
                className={styles.input_field}
              />
            </div>
            <div className={styles.input_container}>
              <label htmlFor="dob" className={styles.input_field_label}>
                Date of Birth
              </label>
              <input
                type="text"
                id="dob"
                disabled={!editMode}
                className={styles.input_field}
                onChange={handleGeneralProfileInfoInputChange}
                placeholder="dd--mm--yyyy"
                name="dOB"
                value={generalProfileInfo.dOB}
              />
            </div>
          </div>
          <div className={styles.input_flex_div}>
            <div className={styles.input_container}>
              <label htmlFor="gender" className={styles.input_field_label}>
                Gender
              </label>
              <input
                type="text"
                disabled={!editMode}
                placeholder="Gender"
                id="gender"
                className={styles.input_field}
                onChange={handleGeneralProfileInfoInputChange}
                name="gender"
                value={generalProfileInfo.gender}
              />
            </div>
            <div className={styles.input_container}>
              <label htmlFor="phone" className={styles.input_field_label}>
                Phone No.
              </label>
              <input
                type="tel"
                placeholder="enter your number "
                id="phone"
                disabled={!editMode}
                className={styles.input_field}
                onChange={handleGeneralProfileInfoInputChange}
                name="phone"
                value={generalProfileInfo.phone}
              />
            </div>
          </div>
          <div className={styles.input_flex_div}>
            <div className={styles.input_container}>
              <label htmlFor="email" className={styles.input_field_label}>
                Email
              </label>
              <input
                type="email"
                disabled={true}
                placeholder="Enter your email address"
                id="email"
                className={styles.input_field}
                onChange={handleGeneralProfileInfoInputChange}
                name="email"
                value={generalProfileInfo.email}
              />
            </div>
            <div className={styles.input_container}>
              <label htmlFor="designation" className={styles.input_field_label}>
                Designation
              </label>
              <input
                type="text"
                disabled={!editMode}
                placeholder="Enter your designation"
                id="designation"
                className={styles.input_field}
                onChange={handleGeneralProfileInfoInputChange}
                name="designation"
                value={generalProfileInfo.designation}
              />
            </div>
          </div>
          <div className={styles.input_flex_div}>
            <div className={styles.input_container}>
              <label htmlFor="state" className={styles.input_field_label}>
                State
              </label>
              <input
                type="text"
                name="stateOfUser"
                disabled={!editMode}
                placeholder="Enter your State"
                id="state"
                className={styles.input_field}
                onChange={handleGeneralProfileInfoInputChange}
                value={generalProfileInfo.stateOfUser}
              />
            </div>
            <div className={styles.input_container}>
              <label htmlFor="country" className={styles.input_field_label}>
                Country
              </label>
              <input
                type="text"
                name="country"
                disabled={!editMode}
                placeholder="Enter your country"
                id="country"
                className={styles.input_field}
                onChange={handleGeneralProfileInfoInputChange}
                value={generalProfileInfo.country}
              />
            </div>
          </div>
          <div className={styles.input_flex_div}>
            <div className={styles.input_container}>
              <label htmlFor="about" className={styles.input_field_label}>
                About
              </label>
              <textarea
                className={styles.input_field}
                rows={4}
                name="about"
                disabled={!editMode}
                onChange={handleGeneralProfileInfoInputChange}
                id="about"
                value={generalProfileInfo.about}
              />
            </div>
          </div>
          <div className={styles.input_flex_div}>
            <section id={styles.professional_profile_section}>
              <label className={styles.input_field_label}>Experience</label>
              {professionalFormArray?.map((item) => {
                return (
                  <>
                    <div
                      className={styles.read_only_form}
                      key={item.id}
                      id={item.id}
                    >
                      <div className={styles.readOnlyInput}>
                        <strong>Previous/Current Organisation :</strong>{" "}
                        {item.previousOrCurrentOrganisation}{" "}
                      </div>
                      <div className="professional-profile-form-input readOnlyInput">
                        <strong>Designation :</strong> {item.designation}{" "}
                      </div>
                      <div className="professional-profile-form-input readOnlyInput">
                        <strong>Duration Of Years :</strong>{" "}
                        {item.durationOfYears}{" "}
                      </div>
                      <div className="professional-profile-form-input readOnlyInput">
                        <strong>Your Role :</strong> {item.yourRole}{" "}
                      </div>
                      {/* <img src="./images/deleteIcon.png" alt="delete-icon" /> */}
                      {editMode && (
                        <MdDelete
                          onClick={() =>
                            handleDeleteProfessionalFormIconClick(item.id)
                          }
                          className={styles.delete_icon}
                        />
                      )}
                    </div>
                  </>
                );
              })}
              {editMode && (
                <>
                  <div className="professional-profile-section-form">
                    <div className={styles.input_flex_div}>
                      <div className={styles.input_container}>
                        <input
                          onChange={handleProfessionalFormInputChange}
                          type="text"
                          name="previousOrCurrentOrganisation"
                          className={styles.input_field}
                          placeholder="Previous/Current Organisation"
                          value={professionalInfo.previousOrCurrentOrganisation}
                        />
                      </div>
                      <div className={styles.input_container}>
                        <input
                          onChange={handleProfessionalFormInputChange}
                          type="text"
                          name="designation"
                          className={styles.input_field}
                          placeholder="Designation"
                          value={professionalInfo.designation}
                        />
                      </div>
                    </div>
                    <div className={styles.input_flex_div}>
                      <div className={styles.input_container}>
                        <input
                          onChange={handleProfessionalFormInputChange}
                          type="text"
                          name="durationOfYears"
                          className={styles.input_field}
                          placeholder="Duration of years you worked"
                          value={professionalInfo.durationOfYears}
                        />
                      </div>
                      <div className={styles.input_container}>
                        <input
                          onChange={handleProfessionalFormInputChange}
                          type="text"
                          name="yourRole"
                          className={styles.input_field}
                          placeholder="Your Role"
                          value={professionalInfo.yourRole}
                        />
                      </div>
                    </div>
                  </div>

                  <div onClick={addNewProfessionalFormInput}>
                    {/* <img className='add-more-form-image-container-image' src="./images/addMorePlusIcon.png" alt="add-more-icon" /> */}
                    <IoMdAddCircleOutline className={styles.add_more} />
                  </div>
                </>
              )}
            </section>
          </div>
          <div className={styles.input_flex_div}>
            <section>
              <label htmlFor="edu" className={styles.input_field_label}>
                Education
              </label>
              {educationFormArray?.map((item) => {
                return (
                  <>
                    <div
                      className={styles.read_only_form}
                      key={item.id}
                      id={item.id}
                    >
                      <div>
                        <strong>Degree :</strong> {item.degree}{" "}
                      </div>
                      <div className="education-form-input readOnlyInput">
                        <strong>College/School :</strong> {item.schoolOrCollege}{" "}
                      </div>
                      <div className="education-form-input readOnlyInput">
                        <strong>Starting Date :</strong> {item.startingDate}{" "}
                      </div>
                      <div className="education-form-input readOnlyInput">
                        <strong>Last Date :</strong> {item.lastDate}{" "}
                      </div>

                      {editMode && (
                        <MdDelete
                          onClick={() =>
                            handleDeleteEducationFormIconClick(item.id)
                          }
                          className={styles.delete_icon}
                        />
                      )}
                    </div>
                  </>
                );
              })}
              {editMode && (
                <>
                  <div className="professional-profile-section-form">
                    <div className={styles.input_flex_div}>
                      <div className={styles.input_container}>
                        <input
                          onChange={handleEducationFormInputChange}
                          type="text"
                          name="degree"
                          className={styles.input_field}
                          placeholder="Degree"
                          value={educationInfo.degree}
                        />
                      </div>
                      <div className={styles.input_container}>
                        <input
                          onChange={handleEducationFormInputChange}
                          type="text"
                          name="schoolOrCollege"
                          className={styles.input_field}
                          placeholder="College/School"
                          value={educationInfo.schoolOrCollege}
                        />
                      </div>
                    </div>
                    <div className={styles.input_flex_div}>
                      <div className={styles.input_container}>
                        <input
                          onChange={handleEducationFormInputChange}
                          type="text"
                          name="startingDate"
                          className={styles.input_field}
                          placeholder="Starting Date"
                          value={educationInfo.startingDate}
                        />
                      </div>
                      <div className={styles.input_container}>
                        <input
                          onChange={handleEducationFormInputChange}
                          type="text"
                          name="lastDate"
                          className={styles.input_field}
                          placeholder="Last Date"
                          value={educationInfo.lastDate}
                        />
                      </div>
                    </div>
                    <div onClick={addNewEducationFormInput}>
                      {/* <img className='add-more-form-image-container-image' src="./images/addMorePlusIcon.png" alt="add-more-icon" /> */}
                      <IoMdAddCircleOutline className={styles.add_more} />
                    </div>
                  </div>
                </>
              )}
            </section>
          </div>
          <div className={styles.input_flex_div}>
            <div className={styles.input_container}>
              <label htmlFor="cit" className={styles.input_field_label}>
                Contact Me
              </label>
              {!editMode ? (
                <div className={styles.social_icons_cont}>
                  {userDoc?.instagramLink === "" ? null : (
                    <div className={styles.social_icon}>
                      <a href={userDoc?.instagramLink}>
                        <BsInstagram className={styles.instaLink} />
                      </a>
                    </div>
                  )}
                  {userDoc?.facebookLink === "" ? null : (
                    <div className={styles.social_icon}>
                      <a href={userDoc?.facebookLink}>
                        <BsFacebook className={styles.facebookLink} />
                      </a>
                    </div>
                  )}
                  {userDoc?.twitterLink === "" ? null : (
                    <div className={styles.social_icon}>
                      <a href={userDoc?.twitterLink}>
                        <BsTwitter className={styles.twitterLink} />
                      </a>
                    </div>
                  )}
                  {userDoc?.linkedinLink === "" ? null : (
                    <div className={styles.social_icon}>
                      <a href={userDoc?.linkedinLink}>
                        <BsLinkedin className={styles.linkedinLink} />
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className={styles.input_flex_div}>
                    <div className={styles.input_container}>
                      <input
                        onChange={handleSocialLinkFormInputChange}
                        type="text"
                        name="instaLink"
                        className={styles.input_field}
                        placeholder="Instagram Link"
                        value={socialLinkInfo.instaLink}
                      />
                    </div>
                  </div>
                  <div className={styles.input_flex_div}>
                    <div className={styles.input_container}>
                      <input
                        onChange={handleSocialLinkFormInputChange}
                        type="text"
                        name="facebookLink"
                        className={styles.input_field}
                        placeholder="Facebook Link"
                        value={socialLinkInfo.facebookLink}
                      />
                    </div>
                  </div>
                  <div className={styles.input_flex_div}>
                    <div className={styles.input_container}>
                      <input
                        onChange={handleSocialLinkFormInputChange}
                        type="text"
                        name="twitterLink"
                        className={styles.input_field}
                        placeholder="Twitter Link"
                        value={socialLinkInfo.twitterLink}
                      />
                    </div>
                  </div>
                  <div className={styles.input_flex_div}>
                    <div className={styles.input_container}>
                      <input
                        onChange={handleSocialLinkFormInputChange}
                        type="text"
                        name="linkedinLink"
                        className={styles.input_field}
                        placeholder="Linkedin Link"
                        value={socialLinkInfo.linkedInLink}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            className={styles.save_btn}
            disabled={!editMode}
            onClick={updateUserDocAddNewImageCreateFundingUser}
          >
            Save
          </button>
        </form>
      </section>
    </Layout>
  );
};

export default Profile;
