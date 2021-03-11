let ContactModelData = [
  {
    id: 1,
    full_name: "Naveed Fida",
    email: "nf@example.com",
    phone_number: "12345678901",
    tags: "work,friend,programmer"
  },
  {
    id: 2,
    full_name: "Victor Reyes",
    email: "vpr@example.com",
    phone_number: "09876543210",
    tags: "work,friend,scientist"
  },
  {
    id: 3,
    full_name: "Pete Hanson",
    email: "ph@example.com",
    phone_number: "54321098761",
    tags: "work"
  },
  {
    id: 4,
    full_name: "Eric Ricketts",
    email: "eric_ricketts@icloud.com",
    phone_number: "9194495529",
    tags: null
  },
  {
    id: 5,
    full_name: "Wendy Ricketts",
    email: "wendy_ricketts@icloud.com",
    phone_number: "9194495456",
    tags: "relative"
  },
  {
    id: 6,
    full_name: "Marilyn Ricketts",
    email: "marilynricketts@icloud.com",
    phone_number: "7036085704",
    tags: "relative"
  }
];

let FormattedContactModelData = [
  {
    id: 1,
    full_name: "Naveed Fida",
    email: "nf@example.com",
    phone_number: "12345678901",
    tags: ["friend", "programmer", "work"]
  },
  {
    id: 2,
    full_name: "Victor Reyes",
    email: "vpr@example.com",
    phone_number: "09876543210",
    tags: ["friend" , "scientist", "work"]
  },
  {
    id: 3,
    full_name: "Pete Hanson",
    email: "ph@example.com",
    phone_number: "54321098761",
    tags: ["work"]
  },
  {
    id: 4,
    full_name: "Eric Ricketts",
    email: "eric_ricketts@icloud.com",
    phone_number: "9194495529",
    tags: []
  },
  {
    id: 5,
    full_name: "Wendy Ricketts",
    email: "wendy_ricketts@icloud.com",
    phone_number: "9194495456",
    tags: ["relative"]
  },
  {
    id: 6,
    full_name: "Marilyn Ricketts",
    email: "marilynricketts@icloud.com",
    phone_number: "7036085704",
    tags: ["relative"]
  }
];

export { ContactModelData, FormattedContactModelData };