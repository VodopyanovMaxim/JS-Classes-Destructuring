const task = 3;

switch (task) {
  case 1: {
    const user = {
      firstName: "John",
      lastName: "Doe",
      age: 30,
      address: {
        street: "123 Main Street",
        city: "Anytown",
        country: "USA",
        postalCode: "12345",
        state: "California",
        coordinates: {
          latitude: 37.7749,
          longitude: -122.4194,
        },
      },
      contacts: {
        email: "john.doe@example.com",
        phone: "123-456-7890",
        social: {
          facebook: "john.doe.123",
          twitter: "@johndoe",
          instagram: "@johndoe123",
        },
      },
      hobbies: ["reading", "traveling", "hiking"],
      education: {
        degree: "Bachelor's",
        field: "Computer Science",
        university: "University of California, Berkeley",
      },
      work: {
        company: "ABC Corp",
        position: "Software Engineer",
        experience: "5 years",
      },
      family: {
        spouse: {
          firstName: "Jane",
          lastName: "Doe",
          age: 28,
        },
        children: [
          { name: "Emily", age: 5 },
          { name: "Michael", age: 3 },
        ],
      },
    };
    const {
      age,
      education: { university: education },
      address: {
        city: address,
        coordinates: { latitude },
      },
      contacts: { email: userEmail },
      hobbies: [, secondHobbie],
      family: {
        children: [{ name: firstChildName }],
      },
    } = user;
    console.log(
      [
        age,
        education,
        address,
        latitude,
        userEmail,
        secondHobbie,
        firstChildName,
      ].join(", "),
    );
    break;
  }
  case 2: {
    class Post {
      static count = 0;
      static availableHashtags = [
        "web",
        "js",
        "javascript",
        "css",
        "html",
        "education",
        "freshcode",
      ];
      static tagColors = {
        web: "green",
        js: "yellow",
        javascript: "yellow",
        css: "blue",
        html: "gray",
        education: "pink",
        freshcode: "orange",
      };
      constructor(title, author, text, image = "", hashtags = []) {
        this.id = ++Post.count;
        this.title = title;
        this.author = author;
        this.text = text;
        this.date = new Date().toLocaleString();
        this._likes = 0;
        this.image = image;
        this.hashtags = hashtags;
      }

      get likes() {
        return this._likes;
      }

      set likes(amount) {
        if (Number.isNaN(amount)) {
          throw new RangeError("Likes field cannot have NaN value");
        }
        if (amount < 0) {
          throw new RangeError("Likes field requires positive integer");
        }
        try {
          this._likes = amount;
        } catch (e) {
          console.log(e.name, e.message);
        }
      }

      get hashtags() {
        return this._hashtags;
      }

      set hashtags(tags) {
        let appliedHashtags = [];
        tags.forEach((tag) => {
          if (
            Post.availableHashtags.includes(tag) &&
            appliedHashtags.length < 6
          ) {
            appliedHashtags.push(tag);
          }
        });
        this._hashtags = appliedHashtags;
      }

      changeText(newText) {
        this.text = newText;
      }

      incrementLikes() {
        this.likes += 1;
      }

      decrementLikes() {
        this.likes -= 1;
      }
    }

    const p = new Post("My first post!", "Me", "Hi, this is my first post");
    console.log(p.likes);
    p.incrementLikes();
    p.incrementLikes();
    p.incrementLikes();
    console.log(p.likes);
    p.decrementLikes();
    p.decrementLikes();
    console.log(p.likes);
    p.decrementLikes();
    p.decrementLikes();
    p.decrementLikes();
    p.decrementLikes();
    console.log(p.likes);
    p.likes = -4;
    console.log(p.likes);
    p.likes = 20;
    console.log(p.likes);
    console.log(p.text);
    p.changeText("Changed text from the original");
    console.log(p.text);

    const p2 = new Post(
      "My second post!",
      "Me",
      "Hi, this is my second post with picture and hashtags!!!",
      "https://thumbs.dreamstime.com/b/sunrise-cancun-sun-rising-over-oceam-beams-shining-clouds-43870220.jpg",
      [
        "education",
        "photography",
        "js",
        "filler",
        "filler",
        "freshcode",
        "freshcode",
        "freshcode",
        "freshcode",
        "freshcode",
        "freshcode",
      ],
    );
    console.group("Hashtags that were applied to the post");
    p2.hashtags.map((e) => console.log(`#${e} (${Post.tagColors[e]})`)); // education, js, freshcode, freshcode, freshcode, freshcode
    console.groupEnd();
    break;
  }
  case 3: {
    class RangeValidator {
      constructor(from, to) {
        this._from = from;
        this._to = to;
      }

      get from() {
        return this._from;
      }
      set from(newFrom) {
        if (newFrom > this.to) {
          throw new RangeError(
            "New starting value can not exceed ending value",
          );
        }
        try {
          this._from = newFrom;
        } catch (e) {
          console.log(e.name, e.message);
        }
      }

      get to() {
        return this._to;
      }

      set to(newTo) {
        if (newTo < this.from) {
          throw new RangeError(
            "New ending value can not be lower than the starting value",
          );
        }
        try {
          this._to = newTo;
        } catch (e) {
          console.log(e.name, e.message);
        }
      }

      get range() {
        return [this.from, this.to];
      }

      isValid(number) {
        return number >= this.from && number <= this.to;
      }
    }

    // Конструктор (+сеттери)
    const range1 = new RangeValidator(1, 5.5); // Відпрацьовує
    const range2 = new RangeValidator(10, 5.5); // ПОМИЛКА! (оскільки має бути from <= to)

    // Робота сетерів
    range1.from = 5; // Відпрацьовує
    range1.from = 200; // ПОМИЛКА! (оскільки не має бути більше заданого вище в конструкторі to: 5.5)
    range1.to = 80; // Відпрацьовує
    range1.to = -55; // ПОМИЛКА! (оскільки не має бути менше заданого вище from)

    // Робота гетерів
    console.log(range1.from); // => 5
    console.log(range1.to); // => 80

    // Робота геттера range
    console.log(range1.range); // => [5, 80]

    // Робота validate
    console.log(range1.isValid(10)); // => true (оскільки належить діапазону [5, 80])
    console.log(range1.isValid(100)); // => false (оскільки не належить діапазону [5, 80])
    break;
  }
}
