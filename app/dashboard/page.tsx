"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Box, Button, Container, HStack } from "@chakra-ui/react";

import Welcome from "./sections/welcome";
import Journals from "./sections/journals";
import Quests from "./sections/quests";
import Oracle from "./sections/oracle";

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get("section");

  const [selectedSection, setSelectedSection] = useState(sectionParam || "welcome");

  useEffect(() => {
    if (sectionParam) setSelectedSection(sectionParam);
  }, [sectionParam]);

  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
    router.push(`/dashboard?section=${section}`, { scroll: false });
  };

  return (
    <Box bg="parchment.light" minH="100vh">
      <Box py={4} bg="parchment.dark" borderBottom="1px solid" borderColor="#C5D1E8">
        <Container maxW="container.xl">
          <HStack spacing={4} justify="center" wrap="wrap">
            <Button
              bg={selectedSection === "journals" ? "leather.default" : "#7A94C1"}
              color="white"
              _hover={{ bg: "leather.dark" }}
              onClick={() => handleSectionChange("journals")}
              fontFamily="Quicksand"
              fontWeight="600"
            >
              My Journals 📚
            </Button>
            <Button
              bg={selectedSection === "quests" ? "leather.default" : "#7A94C1"}
              color="white"
              _hover={{ bg: "leather.dark" }}
              onClick={() => handleSectionChange("quests")}
              fontFamily="Quicksand"
              fontWeight="600"
            >
              Quest Board 📜
            </Button>
            <Button
              bg={selectedSection === "oracle" ? "leather.default" : "#7A94C1"}
              color="white"
              _hover={{ bg: "leather.dark" }}
              onClick={() => handleSectionChange("oracle")}
              fontFamily="Quicksand"
              fontWeight="600"
            >
              The Oracle 🔮
            </Button>
          </HStack>
        </Container>
      </Box>

      <Box py={{ base: "4", md: "4" }}>
        <Container maxW="container.xl">
          {selectedSection === "welcome" && <Welcome />}
          {selectedSection === "journals" && <Journals />}
          {selectedSection === "quests" && <Quests />}
          {selectedSection === "oracle" && <Oracle />}
        </Container>
      </Box>
    </Box>
  );
}
