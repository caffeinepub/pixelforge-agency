import List "mo:core/List";
import Runtime "mo:core/Runtime";

actor {
  type Message = {
    name : Text;
    email : Text;
    subject : ?Text;
    message : Text;
  };

  type PortfolioItem = {
    title : Text;
    category : Text;
    description : Text;
    imageUrl : Text;
  };

  let messagesList = List.empty<Message>();
  let portfolioList = List.empty<PortfolioItem>();

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, subject : ?Text, message : Text) : async Bool {
    let newMessage : Message = {
      name;
      email;
      subject;
      message;
    };
    messagesList.add(newMessage);
    true;
  };

  public query ({ caller }) func getAllMessages() : async [Message] {
    messagesList.toArray();
  };

  public shared ({ caller }) func addPortfolioItem(title : Text, category : Text, description : Text, imageUrl : Text) : async () {
    let newItem : PortfolioItem = {
      title;
      category;
      description;
      imageUrl;
    };
    portfolioList.add(newItem);
  };

  public query ({ caller }) func getAllPortfolioItems() : async [PortfolioItem] {
    portfolioList.toArray();
  };

  // Pre-populate portfolio with sample items
  public shared ({ caller }) func initializePortfolio() : async () {
    if (portfolioList.isEmpty()) {
      let samples = [
        {
          title = "Modern Website Design";
          category = "Web Design";
          description = "A sleek and responsive website for a tech startup.";
          imageUrl = "https://example.com/image1.jpg";
        },
        {
          title = "Brand Identity Package";
          category = "Branding";
          description = "Complete branding solution for a retail business.";
          imageUrl = "https://example.com/image2.jpg";
        },
      ];
      for (item in samples.values()) {
        portfolioList.add(item);
      };
    } else {
      Runtime.trap("Portfolio already initialized");
    };
  };
};
