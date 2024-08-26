import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";

interface DateProps {
  startDate: string;
  endDate: string;
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl";
}

const DisplayDate: React.FC<DateProps> = ({
  startDate,
  endDate,
  size = "sm",
}) => {
  const [prefix, setPrefix] = useState("Commence dans");
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Met le status à jour toutes les secondes
    const updateCountdown = () => {
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();
      const now = new Date().getTime();

      // Si la date de début est dans le futur, on affiche le temps restant avant le début
      let target = start > now ? start : end;
      setPrefix(start > now ? "Commence dans" : "Termine dans");

      // Si la date de fin est atteinte, on affiche le message "Challenge terminé"
      const distance = target - now;
      if (distance < 0) {
        setPrefix("");
        setStatus("Challenge terminé");
        return;
      }

      // Calcul du nombre de jours
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      // Calcul du nombre d'heures
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      // Calcul du nombre de minutes
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      // Calcul du nombre de secondes
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Affichage des jour si + de 0 jours, sinon affichage des heures, minutes et secondes
      setStatus(
        days > 0 ? ` ${days} jours` : `${hours} h ${minutes} m ${seconds} s`
      );
    };

    // appelle la fonction updateCountdown toutes les secondes
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    // Nettoyage de l'intervalle au démontage du composant
    return () => clearInterval(interval);
  }, [startDate, endDate]);

  return (
    <Text style={styles.text}>
      {prefix}
      <Text style={styles.span}>{status}</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
  span: {
    fontWeight: "bold",
  },
});

export default DisplayDate;
