  // Jeu Devine le nombre de l'ordinateur
  var Game = function(max){
    // initialisation nombre aléatoire
    this.answer = Math.floor(Math.random() * max);
    // Condition des réponse de l'ordinateur par rapport au chiffre entrer par l'utilisateur
    // Guess = Nombre choisie par l'utilisateur
    console.log(this.answer);
    this.test = function(guess){
      // Si guess est plus petit que answer il nous retourne +
      if (guess < this.answer){
        return "Le nombre que tu cherche est plus grand !";
      }
      // Sinon si guess est plus grand que answer il nous retourne -
      else if (guess > this.answer){
        return "Le nombre que tu cherche est plus petit !";
      }
      // Sinon Guess est égale à answer retourne Vrai
      else {
        return "Bravo tu as trouvé ! Tu es plus fort que mon procésseur ...";
      }
    }
  }

$(document).ready(function(){
  // Appel de la Class Game et du resultat
  var g = new Game(10000);
  var result = g.answer;
  // initialisation du Compte à rebours
  var started = false;
  var chrono = 45;
  var timer;
  // initialisation Compteur de tours
  var count = 0;
  $("#guess").hide();
  $(".chrono").hide();
  $(".again").hide();

  $(".start").on("click",function(){
    // Start passe a true et lance le CaR
    // on fait apparaitre le CaR et le input et on cache le button démarré
    // ainsi que les instruction
    started = true;
    $(".chrono").html(chrono);
    $(".chrono").show("slow");
    $("#guess").show("slow");
    $(".start").hide("slow");
    $(".instruction").hide("slow");
  });

  $("#guess").on("keypress", function(e){
    if(e.which == 13){
      // A chaque appuis sur Entrer on récupere la valeur de l'input
      var numUser = $("#guess").val();
      // Incrémentation du conteur
      count ++;
      // On verifie si la valeur de l'input est égale au résultat
      // Si il est égale alors il fait apparaitre le
      // boutton pour rejouer et cache l'input et le CaR
      if(numUser == result){
        $(".again").show("slow");
        $(".play").hide("slow");
        clearInterval(timer);
        chrono = 60 - chrono;
        $(".count").hide("slow");
        $(".result").prepend("<p id='score'>" +"Tu as trouver la réponse en "+ chrono +"s et "+ count + " tours !<p>").show()
      }
      // On fait ensuite disparaitre les éléments avec la class ciao
      // Puis on ajoute un paragraphe avec la class Ciao
      // Dans le p on a le test de la Class Game a la valeur de l'input
      $(".ciao").remove();
      $(".result").prepend("<p class='ciao'>"+ g.test(numUser) +"</p>");
      // disparition des élément avec la class stock
      // Apparition d'un élément avec la class stock pour affiché le nombre de tours
      $(".stock").remove();
      $(".count").append("<span class='stock'>"+"Tours numéro : "+ count +"</span>");
      // suppréssion de la valeur de l'input
      $(this).val(" ");
    }

  });
  // Fonction du Compte à rebours
    $("#guess").on("click", function(){
        // si started est vrai
        if (started){
          // alors ajoute une fonction avec un interval à timer
          timer=setInterval(function(){
            // Apparition des secondes dans le html
            $(".chrono").html(chrono);
              if(chrono > 0){
                chrono--;
              }else{
                // Apparition du boutton pour rejouer
                // disparition du input et du CaR
                $(".again").show("slow");
                $(".play").hide("slow");
                $(".ciao").remove();
                $(".result").prepend("<p class='ciao'>"+ "Tu as perdu, tu peux retenter ta chance... Mais tu n'y arriveras pas :)" +"</p>")

              }
          }, 1000);
            // Started repasse à false pour éviter que l'interval n'auguemente à chaque clique
              started = false;
        }
      })

  // Rechargement de la page pour une nouvelle partie
  $(".again").on("click",function replay() {
    window.location.reload();
  });

});
