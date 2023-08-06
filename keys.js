const MK1 = [
    "eR00d8NAQEgDP",
    "VVtgiIbS7YvjF",
    "qcEVxorge3zca",
    "NkI5PmfJFZ6",
    "7BZf0bUwn2X2oY4",
    "cB44YkQk7AYJw",
    "jh9Zo4mbuGxaXP",
    "M15_tset_ks",
  ],
  FSK = "76",
  ASK = "cElm9K";
let _K1 = ASK.split("").reverse().join("");

let s1 = MK1.join("").split("").reverse().join(""),
  s2 = s1.split(FSK),
  s3 = s2[0] + s2[1],
  s4 = s3 + _K1;

export default {
  "public-key":
    "pk_test_51MPXaxGubm4oZ9hjj2yYv1y9X2CaKMoVT8vDf5LdOLx1BCI72Qq0QNdv02WKMlAPhWbPYFKZQsPnKcpdcsdQQpqv0019LQLln0",
  "secret-key": s4,
};
// export default {
//     "public-key":
//       "pk_test_51MPXaxGubm4oZ9hjj2yYv1y9X2CaKMoVT8vDf5LdOLx1BCI72Qq0QNdv02WKMlAPhWbPYFKZQsPnKcpdcsdQQpqv0019LQLln0",
//     "secret-key":
//       "sk_test_51MPXaxGubm4oZ9hjwJYA7kQkY44Bc4Yo2X2nwUb0fZBZFJfmP5IkNacz3egroxVEcqFjvY7SbIigtVVPDgEQAN8d00ReK9mlEc",
//   };
// K9mlEc
