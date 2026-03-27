export const subscriptionToggleResultShape = {
  action: "subscribed",
  ownerId: "",
  subscribersCount: 0,
};

export const followerShape = {
  userId: "",
  userName: "",
  photoUrl: null,
};

export const followersResultShape = {
  ownerId: "",
  subscribers: [],
  total: 0,
};

export const followingResultShape = {
  userId: "",
  followingOwnerIds: [],
  total: 0,
};
