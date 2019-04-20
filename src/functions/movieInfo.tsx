import { from, forkJoin, Observable } from "rxjs";
import axios from "axios";

export const loadPeople = (characters: string[]): Observable<any[]> => {
  let names = characters.map(character => {
    return from(
      axios
        .get(character)
        .then(result => {
          return result.data.name;
        })
        .catch(err => {
          return err.message + " " + character;
        })
    );
  });

  return forkJoin(names);
};
