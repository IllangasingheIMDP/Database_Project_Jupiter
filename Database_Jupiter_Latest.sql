CREATE DATABASE  IF NOT EXISTS `hrms` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hrms`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: hrms
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branch` (
  `Branch_ID` int NOT NULL,
  `Branch_Name` varchar(20) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Country` varchar(20) DEFAULT NULL,
  `Organization_ID` int DEFAULT NULL,
  PRIMARY KEY (`Branch_ID`),
  KEY `Organization_ID_idx` (`Organization_ID`),
  CONSTRAINT `FK_B_Organization_ID` FOREIGN KEY (`Organization_ID`) REFERENCES `organization` (`Organization_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES (1,'Moratuwa','No 332, ABC, Road','Sri Lanka',1),(2,'Katubadda','No 332, ABC, Road','Sri Lanka',1),(3,'Ratnapura','No 200, Ratnapura','Sri Lanka',1),(4,'Colombo','No 321, Colombo','Sri Lanka',1);
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `custom_field`
--

DROP TABLE IF EXISTS `custom_field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `custom_field` (
  `Field_ID` int NOT NULL,
  `Field_Name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Field_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `custom_field`
--

LOCK TABLES `custom_field` WRITE;
/*!40000 ALTER TABLE `custom_field` DISABLE KEYS */;
INSERT INTO `custom_field` VALUES (3,'Languages'),(5,'Hobbies'),(7,'Education');
/*!40000 ALTER TABLE `custom_field` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `Dept_ID` int NOT NULL,
  `Dept_Name` varchar(20) DEFAULT NULL,
  `Branch_ID` int DEFAULT NULL,
  PRIMARY KEY (`Dept_ID`),
  KEY `Branch_ID_idx` (`Branch_ID`),
  CONSTRAINT `FK_D_Branch_ID` FOREIGN KEY (`Branch_ID`) REFERENCES `branch` (`Branch_ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'Engineering',1),(2,'Finance',1),(3,'R&D',1),(4,'Marketing',1),(5,'Sales',1),(6,'IT',1),(7,'Customer Service',2),(8,'Legal',2),(9,'Creative',2),(10,'Human Resources',2);
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dependent_info`
--

DROP TABLE IF EXISTS `dependent_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dependent_info` (
  `Name` varchar(20) NOT NULL,
  `Employee_ID` char(36) NOT NULL,
  `Relationship` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Name`,`Employee_ID`),
  KEY `FK_DI_Employee_ID_idx` (`Employee_ID`),
  CONSTRAINT `FK_DI_Employee_ID` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`Employee_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dependent_info`
--

LOCK TABLES `dependent_info` WRITE;
/*!40000 ALTER TABLE `dependent_info` DISABLE KEYS */;
INSERT INTO `dependent_info` VALUES (' Almir Mayrhofer','476e331d-96e0-11ef-bf92-a036bc6a0fae','Son'),(' Dragica Wiesinger','476e331d-96e0-11ef-bf92-a036bc6a0fae','Daughter'),('Chehan.Mother','b422eae9-969a-11ef-bf92-a036bc6a0fae','Mother'),('Dasun.Father','3502deb3-969d-11ef-bf92-a036bc6a0fae','Father'),('Jochen Schwab','476e331d-96e0-11ef-bf92-a036bc6a0fae','Son'),('Krishmal.Mother','f2e44337-969e-11ef-bf92-a036bc6a0fae','Mother'),('Malaka.Father','7315d845-9699-11ef-bf92-a036bc6a0fae','Father'),('Malaka.Mother','7315d845-9699-11ef-bf92-a036bc6a0fae','Mother'),('Nipun.Mother','1ffd044d-969e-11ef-bf92-a036bc6a0fae','Mother');
/*!40000 ALTER TABLE `dependent_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emergency_contact`
--

DROP TABLE IF EXISTS `emergency_contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emergency_contact` (
  `Contact_ID` char(36) NOT NULL,
  `Employee_ID` char(36) NOT NULL,
  `First_Name` varchar(20) NOT NULL,
  `Last_Name` varchar(20) NOT NULL,
  `Phone` varchar(20) NOT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Address` varchar(255) NOT NULL,
  `Relationship` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Contact_ID`,`Employee_ID`),
  KEY `FK_EC_Employee_ID_idx` (`Employee_ID`),
  CONSTRAINT `FK_EC_Employee_ID` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`Employee_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emergency_contact`
--

LOCK TABLES `emergency_contact` WRITE;
/*!40000 ALTER TABLE `emergency_contact` DISABLE KEYS */;
INSERT INTO `emergency_contact` VALUES ('1ffda869-969e-11ef-bf92-a036bc6a0fae','1ffd044d-969e-11ef-bf92-a036bc6a0fae','F.Nipun.Mother','L.Nipun.Mother','071Mother','email.Mother','No, 500, Malaka','Mother'),('35030df6-969d-11ef-bf92-a036bc6a0fae','3502deb3-969d-11ef-bf92-a036bc6a0fae','F.Dasun.Father','L.Dasun.Father','0846284','dasunpramodya616@gmail.com','No 332, ABC, Road, Anuradhapura','Father'),('476e89d5-96e0-11ef-bf92-a036bc6a0fae','476e331d-96e0-11ef-bf92-a036bc6a0fae','Jochen','Schwab','0678 7839122',' d.wiesinger@worldwidesolution.io','Emely-Ott-Gasse 75 6682 Feldkirchen in Kärnten','Son'),('476e9378-96e0-11ef-bf92-a036bc6a0fae','476e331d-96e0-11ef-bf92-a036bc6a0fae','Almir','Mayrhofer','0678 7839122','m.tokunaga@travelbanana.com','Emely-Ott-Gasse 75 6682 Feldkirchen in Kärnten','Son'),('476e98c1-96e0-11ef-bf92-a036bc6a0fae','476e331d-96e0-11ef-bf92-a036bc6a0fae','Dragica','Wiesinger',' 0678 7839122',' d.wiesinger@worldwidesolution.io','Emely-Ott-Gasse 75 6682 Feldkirchen in Kärnten','Daughter'),('73169536-9699-11ef-bf92-a036bc6a0fae','7315d845-9699-11ef-bf92-a036bc6a0fae','F.Mother','L.Mother','071Mother','email.Mother','No, 500, Malaka','Mother'),('74b8315e-969b-11ef-bf92-a036bc6a0fae','74b81486-969b-11ef-bf92-a036bc6a0fae','Rahaf','Siddiqui','+18149950062','r.siddiqui@captainmarvel.io','69508 Blanda Plaza Suite 099 Lake Anissa, MD 45243-2226','Daughter'),('b42364a6-969a-11ef-bf92-a036bc6a0fae','b422eae9-969a-11ef-bf92-a036bc6a0fae','F.Chehan.Mother','L.Chehan.Mother','654574843522','L.Chehan.Mother@gmail.com','No 332, CCC, Road','Mother'),('f2e499b3-969e-11ef-bf92-a036bc6a0fae','f2e44337-969e-11ef-bf92-a036bc6a0fae','F.Krishmal.Mother','L.Krishmal.Mother','0713757625252','krishmalgamage20021027@gmail.com','No 332, ABC, Road','Mother');
/*!40000 ALTER TABLE `emergency_contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `Employee_ID` char(36) NOT NULL,
  `NIC` varchar(20) NOT NULL,
  `Initials` varchar(20) DEFAULT NULL,
  `First_Name` varchar(20) NOT NULL,
  `Last_Name` varchar(20) NOT NULL,
  `Date_of_Birth` date NOT NULL,
  `Gender` enum('Male','Female','Other') NOT NULL,
  `Marital_Status` enum('Married','Single') DEFAULT NULL,
  `Phone` varchar(20) NOT NULL,
  `Email_Work` varchar(50) NOT NULL,
  `Email_private` varchar(50) DEFAULT NULL,
  `Address` varchar(255) NOT NULL,
  `Pic_ID` char(36) DEFAULT NULL,
  `Dept_ID` int NOT NULL,
  `Title_ID` int NOT NULL,
  `PayGrade_ID` int NOT NULL,
  `Employment_Stat_ID` int NOT NULL,
  `PF_Number` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Employee_ID`,`NIC`),
  UNIQUE KEY `Employee_ID_UNIQUE` (`Employee_ID`),
  UNIQUE KEY `NIC_UNIQUE` (`NIC`),
  UNIQUE KEY `Email_Work_UNIQUE` (`Email_Work`),
  KEY `Pic_ID_idx` (`Pic_ID`),
  KEY `Dept_ID_idx` (`Dept_ID`),
  KEY `Title_ID_idx` (`Title_ID`),
  KEY `PayGrade_ID_idx` (`PayGrade_ID`),
  KEY `Employment_Stat_ID_idx` (`Employment_Stat_ID`),
  CONSTRAINT `FK_E_Dept_ID` FOREIGN KEY (`Dept_ID`) REFERENCES `department` (`Dept_ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `FK_E_Employment_Stat_ID` FOREIGN KEY (`Employment_Stat_ID`) REFERENCES `employment_status` (`Employment_Stat_ID`) ON UPDATE CASCADE,
  CONSTRAINT `FK_E_PayGrade_ID` FOREIGN KEY (`PayGrade_ID`) REFERENCES `pay_grade` (`PayGrade_ID`) ON UPDATE CASCADE,
  CONSTRAINT `FK_E_Pic_ID` FOREIGN KEY (`Pic_ID`) REFERENCES `employee_pic` (`Pic_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_E_Title_ID` FOREIGN KEY (`Title_ID`) REFERENCES `job_title` (`Title_ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('03db50a4-96be-11ef-bf92-a036bc6a0fae','2536 6964 4121 4206','G.D.',' Angie','Mejias','1997-01-28','Female','Single','+1 (979) 586-4232','a.mejias@conquercomet.io','a.mejias@conquercomet.io','82193 Swift Courts Kamrenborough, CT 17391','03db8fb7-96be-11ef-bf92-a036bc6a0fae',1,3,4,1,' CL97793724639'),('1ffd044d-969e-11ef-bf92-a036bc6a0fae','200227723850','C.D.','Nipun','Sachintha','2003-01-01','Male','Single','0846284343','nipunsachintha0@gmail.com','nipunsachintha0@gmail.com','No, 234, Badulle','1ffd2e14-969e-11ef-bf92-a036bc6a0fae',1,3,1,1,'PFPFPF22342'),('3502deb3-969d-11ef-bf92-a036bc6a0fae','200227703343','A.','Dasun','Illangasinghe','2002-10-05','Male','Single','07162523232','dasunpramodya616@gmail.com','dasunpramodya616@gmail.con','No 332, ABC, Road, Anuradhapura','3502e915-969d-11ef-bf92-a036bc6a0fae',1,4,1,1,'PFPFPF27432'),('3bf6b894-96ba-11ef-bf92-a036bc6a0fae',' 4532 0941 6008 0','H.A.','Herceg','Angyal','1984-01-08','Male','Married','071625252','h.angyal@launchmedia.com','h.angyal@launchmedia.com',' 4752 Gönc, Pataki udvar 6. 23. emelet','3bf6cd8b-96ba-11ef-bf92-a036bc6a0fae',10,3,2,1,'PFPFPF219842'),('476e331d-96e0-11ef-bf92-a036bc6a0fae','5436 7369 1193 4646','G.','Mikio','Tokunaga','1971-08-03','Male','Single',' 0590-654-831','m.tokunaga@travelbanana.com','m.tokunaga@travelbanana.com','Angelina-Buchner-Straße 27 3150 Herzogenburg','476e4ad3-96e0-11ef-bf92-a036bc6a0fae',8,2,2,2,' JP188168841827'),('7315d845-9699-11ef-bf92-a036bc6a0fae','200227703580','S.D.','Malaka','Gunawardana','2002-10-03','Male','Single','071625252','sdmalakagunawardana@gmail.com','sdmalakagunawardana@gmail.com','No, 500, Malaka','73160f17-9699-11ef-bf92-a036bc6a0fae',1,2,1,1,'PF0001'),('74b81486-969b-11ef-bf92-a036bc6a0fae','2221676437330976','C.R.','Vicky','Cordoba','1978-07-24','Female','Married','(3940)49-0529','v.cordoba@brokenyield.org','v.cordoba@brokenyield.org','Flórez 190 9 E Puerto Alex, AR-B 0488','74b81c92-969b-11ef-bf92-a036bc6a0fae',4,3,2,2,'PFPFPF1944'),('b422eae9-969a-11ef-bf92-a036bc6a0fae','200227704545','A.','Chehan','Rupasinghe','2002-11-11','Male','Single','071625252','chehan.hey@gmail.com','chehan.hey@gmail.com','No, 460, Chehan','b422f7fb-969a-11ef-bf92-a036bc6a0fae',1,3,1,1,'PFPFPF2121'),('f2e44337-969e-11ef-bf92-a036bc6a0fae','200225663470','F.S.','Krishmal','Gamage','2002-08-06','Male','Single','0766678252','krishmalgamage20021027@gmail.com','krishmalgamage20021027@gmail.com','No 455, ABCDEF, Road','f2e458f9-969e-11ef-bf92-a036bc6a0fae',1,3,1,1,'PFPFPF2583');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_custom_field`
--

DROP TABLE IF EXISTS `employee_custom_field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_custom_field` (
  `Field_ID` int NOT NULL,
  `Employee_ID` char(36) NOT NULL,
  `Data` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Field_ID`,`Employee_ID`),
  KEY `Employee_ID_idx` (`Employee_ID`),
  CONSTRAINT `FK_E_ID` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`Employee_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_F_ID` FOREIGN KEY (`Field_ID`) REFERENCES `custom_field` (`Field_ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_custom_field`
--

LOCK TABLES `employee_custom_field` WRITE;
/*!40000 ALTER TABLE `employee_custom_field` DISABLE KEYS */;
INSERT INTO `employee_custom_field` VALUES (3,'03db50a4-96be-11ef-bf92-a036bc6a0fae','English'),(3,'1ffd044d-969e-11ef-bf92-a036bc6a0fae','English'),(3,'3502deb3-969d-11ef-bf92-a036bc6a0fae','English, Spanish, Sinhala'),(3,'3bf6b894-96ba-11ef-bf92-a036bc6a0fae','English'),(3,'476e331d-96e0-11ef-bf92-a036bc6a0fae','English, Japanese'),(3,'7315d845-9699-11ef-bf92-a036bc6a0fae','English'),(3,'74b81486-969b-11ef-bf92-a036bc6a0fae','English, Spanish'),(3,'b422eae9-969a-11ef-bf92-a036bc6a0fae','English, Sinhala'),(3,'f2e44337-969e-11ef-bf92-a036bc6a0fae','English, Sinhala'),(5,'03db50a4-96be-11ef-bf92-a036bc6a0fae','Cricket'),(5,'1ffd044d-969e-11ef-bf92-a036bc6a0fae','Hiking'),(5,'3502deb3-969d-11ef-bf92-a036bc6a0fae','Chess, Hiking'),(5,'3bf6b894-96ba-11ef-bf92-a036bc6a0fae','Chess'),(5,'476e331d-96e0-11ef-bf92-a036bc6a0fae','Cricket, Football'),(5,'7315d845-9699-11ef-bf92-a036bc6a0fae','Cricket'),(5,'74b81486-969b-11ef-bf92-a036bc6a0fae','None'),(5,'b422eae9-969a-11ef-bf92-a036bc6a0fae','Cricket'),(5,'f2e44337-969e-11ef-bf92-a036bc6a0fae','Cricket, Chess, Hiking'),(7,'03db50a4-96be-11ef-bf92-a036bc6a0fae','Harvard University'),(7,'1ffd044d-969e-11ef-bf92-a036bc6a0fae','Badulle Central College'),(7,'3502deb3-969d-11ef-bf92-a036bc6a0fae','Anuradhapura Central College'),(7,'3bf6b894-96ba-11ef-bf92-a036bc6a0fae','Cambridge'),(7,'476e331d-96e0-11ef-bf92-a036bc6a0fae','Harvard University'),(7,'7315d845-9699-11ef-bf92-a036bc6a0fae','Bachelor'),(7,'74b81486-969b-11ef-bf92-a036bc6a0fae','Oxferd'),(7,'b422eae9-969a-11ef-bf92-a036bc6a0fae','Bachelor'),(7,'f2e44337-969e-11ef-bf92-a036bc6a0fae','Central College, Galle');
/*!40000 ALTER TABLE `employee_custom_field` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `employee_details_view`
--

DROP TABLE IF EXISTS `employee_details_view`;
/*!50001 DROP VIEW IF EXISTS `employee_details_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `employee_details_view` AS SELECT 
 1 AS `Full_Name`,
 1 AS `NIC`,
 1 AS `Photo_Path`,
 1 AS `Dept_Name`,
 1 AS `Branch_Name`,
 1 AS `Status`,
 1 AS `Title`,
 1 AS `Pay_Grade_Level`,
 1 AS `Branch_ID`,
 1 AS `Dept_ID`,
 1 AS `Title_id`,
 1 AS `Employment_Stat_ID`,
 1 AS `PayGrade_ID`,
 1 AS `Organization_ID`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `employee_pic`
--

DROP TABLE IF EXISTS `employee_pic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_pic` (
  `Pic_ID` char(36) NOT NULL,
  `Path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Pic_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_pic`
--

LOCK TABLES `employee_pic` WRITE;
/*!40000 ALTER TABLE `employee_pic` DISABLE KEYS */;
INSERT INTO `employee_pic` VALUES ('03db8fb7-96be-11ef-bf92-a036bc6a0fae','https://firebasestorage.googleapis.com/v0/b/hrms-3be91.appspot.com/o/userProfileImages%2F1730292776960.jpg?alt=media&token=bd3b5782-70b1-4ec7-a6e0-ba1497d34902'),('1ffd2e14-969e-11ef-bf92-a036bc6a0fae','https://firebasestorage.googleapis.com/v0/b/hrms-3be91.appspot.com/o/userProfileImages%2F1730279092585.jpg?alt=media&token=63476835-fea2-4179-899d-3aef70b8063b'),('3502e915-969d-11ef-bf92-a036bc6a0fae','https://firebasestorage.googleapis.com/v0/b/hrms-3be91.appspot.com/o/userProfileImages%2F1730278708014.jpg?alt=media&token=def4f5d1-743e-406d-9d49-527334bcb692'),('3bf6cd8b-96ba-11ef-bf92-a036bc6a0fae','https://firebasestorage.googleapis.com/v0/b/hrms-3be91.appspot.com/o/userProfileImages%2F1730291192028.jpg?alt=media&token=e5b209a1-357d-4ae9-98f5-127e4674707f'),('3ec4d585-96b9-11ef-bf92-a036bc6a0fae','https://firebasestorage.googleapis.com/v0/b/hrms-3be91.appspot.com/o/userProfileImages%2F1730290584148.jpg?alt=media&token=fa78685f-166e-4f33-a8c7-15cae3be25a6'),('476e4ad3-96e0-11ef-bf92-a036bc6a0fae','https://firebasestorage.googleapis.com/v0/b/hrms-3be91.appspot.com/o/userProfileImages%2F1730307526330.jpg?alt=media&token=646f7ab3-a3c8-4164-911d-426684597fd9'),('73160f17-9699-11ef-bf92-a036bc6a0fae','https://firebasestorage.googleapis.com/v0/b/hrms-3be91.appspot.com/o/userProfileImages%2F1730275646263.jpg?alt=media&token=1cd57e08-c946-4d19-85fc-965e6a794750'),('74b81c92-969b-11ef-bf92-a036bc6a0fae','https://firebasestorage.googleapis.com/v0/b/hrms-3be91.appspot.com/o/userProfileImages%2F1730277929421.jpg?alt=media&token=db030507-0202-45b0-89b0-a51b8bbb33c4'),('b422f7fb-969a-11ef-bf92-a036bc6a0fae','https://firebasestorage.googleapis.com/v0/b/hrms-3be91.appspot.com/o/userProfileImages%2F1730277651938.jpg?alt=media&token=d4eca1c9-f3db-418c-986c-d1779d8bdb23'),('f2e458f9-969e-11ef-bf92-a036bc6a0fae','https://firebasestorage.googleapis.com/v0/b/hrms-3be91.appspot.com/o/userProfileImages%2F1730279450604.jpg?alt=media&token=5ff7a0c4-49bb-4e70-bb42-4414b0cc8fe4');
/*!40000 ALTER TABLE `employee_pic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_supervisor`
--

DROP TABLE IF EXISTS `employee_supervisor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_supervisor` (
  `Employee_ID` char(36) NOT NULL,
  `Supervisor_ID` char(36) NOT NULL,
  PRIMARY KEY (`Employee_ID`,`Supervisor_ID`),
  KEY `FK_ES_Supervisor_ID_idx` (`Supervisor_ID`),
  CONSTRAINT `FK_ES_Employee_ID` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`Employee_ID`) ON UPDATE CASCADE,
  CONSTRAINT `FK_ES_Supervisor_ID` FOREIGN KEY (`Supervisor_ID`) REFERENCES `employee` (`Employee_ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_supervisor`
--

LOCK TABLES `employee_supervisor` WRITE;
/*!40000 ALTER TABLE `employee_supervisor` DISABLE KEYS */;
INSERT INTO `employee_supervisor` VALUES ('03db50a4-96be-11ef-bf92-a036bc6a0fae','1ffd044d-969e-11ef-bf92-a036bc6a0fae'),('3bf6b894-96ba-11ef-bf92-a036bc6a0fae','1ffd044d-969e-11ef-bf92-a036bc6a0fae'),('1ffd044d-969e-11ef-bf92-a036bc6a0fae','3502deb3-969d-11ef-bf92-a036bc6a0fae'),('476e331d-96e0-11ef-bf92-a036bc6a0fae','3502deb3-969d-11ef-bf92-a036bc6a0fae'),('3502deb3-969d-11ef-bf92-a036bc6a0fae','7315d845-9699-11ef-bf92-a036bc6a0fae'),('b422eae9-969a-11ef-bf92-a036bc6a0fae','7315d845-9699-11ef-bf92-a036bc6a0fae'),('f2e44337-969e-11ef-bf92-a036bc6a0fae','7315d845-9699-11ef-bf92-a036bc6a0fae'),('74b81486-969b-11ef-bf92-a036bc6a0fae','b422eae9-969a-11ef-bf92-a036bc6a0fae');
/*!40000 ALTER TABLE `employee_supervisor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employment_status`
--

DROP TABLE IF EXISTS `employment_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employment_status` (
  `Employment_Stat_ID` int NOT NULL,
  `Employment_Stat_Type` enum('Intern','Permanent','Contract','Freelance') DEFAULT NULL,
  PRIMARY KEY (`Employment_Stat_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employment_status`
--

LOCK TABLES `employment_status` WRITE;
/*!40000 ALTER TABLE `employment_status` DISABLE KEYS */;
INSERT INTO `employment_status` VALUES (1,'Intern'),(2,'Permanent'),(3,'Contract'),(4,'Freelance');
/*!40000 ALTER TABLE `employment_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_title`
--

DROP TABLE IF EXISTS `job_title`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_title` (
  `Title_ID` int NOT NULL,
  `Title` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Title_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_title`
--

LOCK TABLES `job_title` WRITE;
/*!40000 ALTER TABLE `job_title` DISABLE KEYS */;
INSERT INTO `job_title` VALUES (2,'HR Manager'),(3,'Employee'),(4,'second Manager');
/*!40000 ALTER TABLE `job_title` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leave_data_balance`
--

DROP TABLE IF EXISTS `leave_data_balance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leave_data_balance` (
  `Employee_ID` char(36) NOT NULL,
  `Year` year NOT NULL,
  `Annual` int DEFAULT NULL,
  `Casual` int DEFAULT NULL,
  `Maternity` int DEFAULT NULL,
  `No_Pay` int DEFAULT NULL,
  `Total_Leave_Count` int DEFAULT NULL,
  PRIMARY KEY (`Employee_ID`,`Year`),
  CONSTRAINT `FK_LDB_Employee_ID` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`Employee_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave_data_balance`
--

LOCK TABLES `leave_data_balance` WRITE;
/*!40000 ALTER TABLE `leave_data_balance` DISABLE KEYS */;
INSERT INTO `leave_data_balance` VALUES ('03db50a4-96be-11ef-bf92-a036bc6a0fae',2024,80,16,8,5,109),('1ffd044d-969e-11ef-bf92-a036bc6a0fae',2024,50,10,5,2,67),('3502deb3-969d-11ef-bf92-a036bc6a0fae',2024,50,10,5,2,67),('3bf6b894-96ba-11ef-bf92-a036bc6a0fae',2024,60,12,6,3,81),('476e331d-96e0-11ef-bf92-a036bc6a0fae',2024,60,12,6,3,81),('7315d845-9699-11ef-bf92-a036bc6a0fae',2024,50,10,5,2,67),('74b81486-969b-11ef-bf92-a036bc6a0fae',2024,60,12,6,3,81),('b422eae9-969a-11ef-bf92-a036bc6a0fae',2024,47,10,5,2,64),('f2e44337-969e-11ef-bf92-a036bc6a0fae',2024,50,10,5,2,67);
/*!40000 ALTER TABLE `leave_data_balance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leave_request`
--

DROP TABLE IF EXISTS `leave_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leave_request` (
  `Request_ID` char(36) NOT NULL,
  `User_ID` char(36) NOT NULL,
  `Leave_Type` enum('Annual','Casual','Maternity','No_Pay') NOT NULL,
  `Start_Date` date NOT NULL,
  `End_Date` date NOT NULL,
  `Reason` varchar(255) NOT NULL,
  `Status` enum('Approve','Reject','Pending') DEFAULT NULL,
  PRIMARY KEY (`Request_ID`,`User_ID`),
  KEY `FK_LR_User_ID_idx` (`User_ID`),
  CONSTRAINT `FK_LR_User_ID` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave_request`
--

LOCK TABLES `leave_request` WRITE;
/*!40000 ALTER TABLE `leave_request` DISABLE KEYS */;
INSERT INTO `leave_request` VALUES ('083ceba7-96de-11ef-bf92-a036bc6a0fae','4fc449af-969d-11ef-bf92-a036bc6a0fae','Casual','2024-10-08','2024-10-15','Sick','Reject'),('74be2a15-96e0-11ef-bf92-a036bc6a0fae','4fc449af-969d-11ef-bf92-a036bc6a0fae','Annual','2024-10-23','2024-10-24','Personal','Pending'),('facf3efd-96d6-11ef-bf92-a036bc6a0fae','4fc449af-969d-11ef-bf92-a036bc6a0fae','Annual','2024-10-01','2024-10-03','Sick','Approve');
/*!40000 ALTER TABLE `leave_request` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_leave_request_insert` AFTER INSERT ON `leave_request` FOR EACH ROW BEGIN
    -- Declare variables to hold supervisor ID and employee username
   
DECLARE supervisor_i CHAR(36);
DECLARE supervisor_user_id CHAR(36);
DECLARE employee_i CHAR(36);
DECLARE employee_name VARCHAR(20);
 
    -- Retrieve the employee's ID and username from the User table
     
SELECT U.Employee_ID, U.User_Name
INTO employee_i, employee_name
FROM user U
WHERE U.User_ID = NEW.User_ID
LIMIT 1;

    -- Check if employee was found
   
        -- Retrieve the supervisor ID from Employee_Supervisor table
        SELECT Supervisor_ID
        INTO supervisor_i
        FROM Employee_Supervisor
        WHERE Employee_ID = employee_i
LIMIT 1;
SELECT User_ID
        INTO supervisor_user_id
        FROM User
        WHERE Employee_ID = supervisor_i
LIMIT 1;
 
        -- Only insert notification if a supervisor exists
        
            INSERT INTO Notification (User_ID, Data)
            VALUES (
                supervisor_user_id,  -- Supervisor's User ID
                CONCAT('Employee ', employee_name, 
                       ' has requested a leave. '
                       )
                            );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `UpdateNotificationAfterApproval` AFTER UPDATE ON `leave_request` FOR EACH ROW BEGIN
declare UserID char(36);
    SELECT new.User_ID INTO UserID; 
    IF NEW.Status = 'Approve' THEN
insert into notification(User_ID,Data) values (UserID,"Your Leave Requset has been approved");
END IF;
    IF NEW.Status = 'Reject' THEN
insert into notification(User_ID,Data) values (UserID,"Your Leave Requset has been rejected");
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `UpdateLeaveBalanceAfterApproval` AFTER UPDATE ON `leave_request` FOR EACH ROW BEGIN
DECLARE leave_days int;
    declare emp_id char(36);
    IF NEW.Status = 'Approve' THEN
        SET leave_days = DATEDIFF(NEW.End_Date, NEW.Start_Date) + 1;
        SET emp_id = (select Employee_ID from hrms.user where user.User_ID = new.User_ID);
 
        -- Check if the user has enough leave balance for the specific leave type
        IF NEW.Leave_Type = 'Annual' THEN
            IF (SELECT Annual FROM leave_data_balance WHERE leave_data_balance.Employee_ID =emp_id AND Year = YEAR(CURDATE())) >= leave_days THEN
                UPDATE leave_data_balance
                SET Annual = Annual - leave_days,
                    Total_leave_Count = Total_leave_Count - leave_days
                WHERE leave_data_balance.Employee_ID = emp_id AND Year = YEAR(CURDATE());
            END IF;
        END IF;
 
        IF NEW.Leave_Type = 'Casual' THEN
            IF (SELECT Casual FROM leave_data_balance WHERE leave_data_balance.Employee_ID =emp_id AND Year = YEAR(CURDATE())) >= leave_days THEN
                UPDATE leave_data_balance
                SET Casual = Casual - leave_days,
                    Total_leave_Count = Total_leave_Count - leave_days
                WHERE Employee_ID = emp_id AND Year = YEAR(CURDATE());
            END IF;
        END IF;
 
        IF NEW.Leave_Type = 'Maternity' THEN
            IF (SELECT Maternity FROM leave_data_balance WHERE leave_data_balance.Employee_ID =emp_id AND Year = YEAR(CURDATE())) >= leave_days THEN
                UPDATE leave_data_balance
                SET Maternity = Maternity - leave_days,
                    Total_leave_Count = Total_leave_Count - leave_days
                WHERE Employee_ID = emp_id AND Year = YEAR(CURDATE());
            END IF;
        END IF;
 
        IF NEW.Leave_Type = 'No_Pay' THEN
            IF (SELECT No_Pay FROM leave_data_balance WHERE leave_data_balance.Employee_ID =emp_id AND Year = YEAR(CURDATE())) >= leave_days THEN
                UPDATE leave_data_balance
                SET No_Pay = No_Pay - leave_days,
Total_leave_Count = Total_leave_Count - leave_days
                WHERE Employee_ID = emp_id AND Year = YEAR(CURDATE());
            END IF;
        END IF;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `leave_requests_view`
--

DROP TABLE IF EXISTS `leave_requests_view`;
/*!50001 DROP VIEW IF EXISTS `leave_requests_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `leave_requests_view` AS SELECT 
 1 AS `Full_Name`,
 1 AS `Employment_NIC`,
 1 AS `User_ID`,
 1 AS `Title`,
 1 AS `Pay_Grade_Level`,
 1 AS `Start_Date`,
 1 AS `End_Date`,
 1 AS `Reason`,
 1 AS `Request_Status`,
 1 AS `Supervisor_Full_Name`,
 1 AS `Supervisor_NIC`,
 1 AS `Supervisor_Title`,
 1 AS `Branch_ID`,
 1 AS `Dept_ID`,
 1 AS `Organization_ID`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `User_ID` char(36) NOT NULL,
  `Data` varchar(255) NOT NULL,
  `DateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Status` tinyint(1) NOT NULL DEFAULT '0',
  KEY `FK_N_User_ID_idx` (`User_ID`),
  CONSTRAINT `FK_N_User_ID` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES ('81b73509-9699-11ef-bf92-a036bc6a0fae','Employee Chehan has requested a leave. ','2024-10-30 21:22:34',1),('4fc449af-969d-11ef-bf92-a036bc6a0fae','Your Leave Requset has been approved','2024-10-30 22:11:07',0),('81b73509-9699-11ef-bf92-a036bc6a0fae','Employee Chehan has requested a leave. ','2024-10-30 22:13:03',1),('4fc449af-969d-11ef-bf92-a036bc6a0fae','Your Leave Requset has been rejected','2024-10-30 22:13:32',0),('81b73509-9699-11ef-bf92-a036bc6a0fae','Employee Chehan has requested a leave. ','2024-10-30 22:30:24',1);
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organization`
--

DROP TABLE IF EXISTS `organization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organization` (
  `Organization_ID` int NOT NULL,
  `Organization_Name` varchar(20) DEFAULT NULL,
  `Registration_No` varchar(20) DEFAULT NULL,
  `HeadOffice` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Organization_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organization`
--

LOCK TABLES `organization` WRITE;
/*!40000 ALTER TABLE `organization` DISABLE KEYS */;
INSERT INTO `organization` VALUES (1,'Jupiter Apparel Ltd','REG942002','Katubedda, Moratuwa');
/*!40000 ALTER TABLE `organization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pay_grade`
--

DROP TABLE IF EXISTS `pay_grade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pay_grade` (
  `PayGrade_ID` int NOT NULL,
  `Pay_Grade_Level` enum('Level-1','Level-2','Level-3','Level-4') DEFAULT NULL,
  `Annual` int DEFAULT NULL,
  `Casual` int DEFAULT NULL,
  `Maternity` int DEFAULT NULL,
  `No_Pay` int DEFAULT NULL,
  PRIMARY KEY (`PayGrade_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pay_grade`
--

LOCK TABLES `pay_grade` WRITE;
/*!40000 ALTER TABLE `pay_grade` DISABLE KEYS */;
INSERT INTO `pay_grade` VALUES (1,'Level-1',50,10,5,50),(2,'Level-2',60,12,6,50),(3,'Level-3',70,14,7,50),(4,'Level-4',80,16,8,50);
/*!40000 ALTER TABLE `pay_grade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `User_ID` char(36) NOT NULL,
  `User_Name` varchar(20) NOT NULL,
  `Password` varchar(60) DEFAULT NULL,
  `Employee_ID` char(36) DEFAULT NULL,
  `Auth_Level` enum('Admin User','HR Manager','Employee','Second Manager') NOT NULL,
  PRIMARY KEY (`User_ID`,`User_Name`),
  UNIQUE KEY `User_Name_UNIQUE` (`User_Name`),
  UNIQUE KEY `User_ID_UNIQUE` (`User_ID`),
  KEY `FK_U_Employee_ID_idx` (`Employee_ID`),
  CONSTRAINT `FK_U_Employee_ID` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`Employee_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('2a0f1c90-2e54-4eeb-9f07-61f2342f8b5e','Admin','$2a$10$nw.AplszBIr1FA0MXFjq.Oa9gtPE8lleuqZsHgLnpXv.1t.66Is72',NULL,'Admin User'),('47177a20-969d-11ef-bf92-a036bc6a0fae','Dasun','$2a$10$OjC9XZathfrCgYQxumKaNec13rpYtMXk/KgsLctLvjx1hD8TM1Jjq','3502deb3-969d-11ef-bf92-a036bc6a0fae','Second Manager'),('4fc449af-969d-11ef-bf92-a036bc6a0fae','Chehan','$2a$10$NelHgq4Mg2fgI/9gcF7Cne8NohMlncis39J0EfqxQUPzRNAiRrNq2','b422eae9-969a-11ef-bf92-a036bc6a0fae','Employee'),('64fa505f-96df-11ef-bf92-a036bc6a0fae','Nipun','$2a$10$Hh1xWComr5dOt91Wkk.BN.0l2CQtTrPDRaDJf9Oy8Xr6CUopzJBbm','1ffd044d-969e-11ef-bf92-a036bc6a0fae','Employee'),('81b73509-9699-11ef-bf92-a036bc6a0fae','Malaka','$2a$10$Fybf5v76OKiafnN16VXcUemlD2JNeL3LgQnlrdwmaBRx6Av8uaEzW','7315d845-9699-11ef-bf92-a036bc6a0fae','HR Manager'),('ff486bca-969e-11ef-bf92-a036bc6a0fae','Krishmal','$2a$10$gsSgdptpZ61JqoLqMoKMfOeWo3V1BBa2E0tINI4Qg5c6HjgwfCrBC','f2e44337-969e-11ef-bf92-a036bc6a0fae','Employee');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'hrms'
--
/*!50106 SET @save_time_zone= @@TIME_ZONE */ ;
/*!50106 DROP EVENT IF EXISTS `reset_leave_balances` */;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8mb4 */ ;;
/*!50003 SET character_set_results = utf8mb4 */ ;;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`localhost`*/ /*!50106 EVENT `reset_leave_balances` ON SCHEDULE EVERY 1 YEAR STARTS '2024-01-01 00:00:00' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
    UPDATE leave_data_balance ldb
    JOIN employee e ON ldb.Employee_ID = e.Employee_ID
    JOIN pay_grade pg ON e.PayGrade_ID = pg.PayGrade_ID
    SET
        ldb.Annual = pg.Annual,
        ldb.Casual = pg.Casual,
        ldb.Maternity = pg.Maternity,
        ldb.No_Pay = pg.No_Pay,
        ldb.Total_Leave_Count = 0
    WHERE ldb.Year = YEAR(CURDATE());
END */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
DELIMITER ;
/*!50106 SET TIME_ZONE= @save_time_zone */ ;

--
-- Dumping routines for database 'hrms'
--
/*!50003 DROP FUNCTION IF EXISTS `add_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `add_user`(
    p_user_name VARCHAR(20),
    p_password VARCHAR(60),
    p_NIC VARCHAR(20),
    p_auth_level ENUM('Admin User', 'HR Manager', 'Employee', 'Second Manager')
) RETURNS json
    MODIFIES SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE _data VARCHAR(100) DEFAULT "NULL";
    DECLARE success BOOLEAN DEFAULT FALSE;
    DECLARE result JSON;
    
    DECLARE user_id_UUID CHAR(36);
    DECLARE employee_id CHAR(36);

    -- Check if the Employee_ID exists in employee table
    IF (NOT EXISTS (SELECT 1 FROM employee WHERE employee.NIC = p_NIC)) THEN
        SET _data = "Employee not found in the database";
        SELECT JSON_OBJECT('success', success, 'data', _data) INTO result;
        RETURN result;  -- Return the result
    END IF;

    -- Check if the username exists
    IF EXISTS (SELECT 1 FROM user WHERE user.User_Name = p_user_name) THEN
        SET _data = "Username already in the database";
        SELECT JSON_OBJECT('success', success, 'data', _data) INTO result;
        RETURN result;  -- Return the result
    END IF;

    -- Retrieve Employee_ID based on NIC
    Select employee.Employee_ID
	into employee_id
	from employee
	where employee.NIC = p_NIC;

    -- Generate a new UUID for the user
    SET user_id_UUID = UUID();

    -- Insert the new user into the user table
    INSERT INTO user (User_ID, User_Name, Password, Employee_ID, Auth_Level) 
    VALUES (user_id_UUID, p_user_name, p_password, employee_id, p_auth_level);

    -- If the insertion is successful, set success to TRUE
    SET success = TRUE;
    SET _data = CONCAT('User created for employee ID: ', employee_id);

    -- Return the success status and data as JSON
    SELECT JSON_OBJECT('success', success, 'data', _data) INTO result;
    RETURN result;  -- Return the result
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_add_contact` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_add_contact`(
	p_employee_id char(36),
	p_first_name varchar(20),
	p_last_name varchar(20),
	p_phone varchar(20),
	p_email varchar(50),
	p_address varchar(255),
	p_relationship varchar(20)
) RETURNS json
    MODIFIES SQL DATA
    DETERMINISTIC
BEGIN
	DECLARE _data VARCHAR(100) DEFAULT "NULL";
    DECLARE success BOOLEAN DEFAULT FALSE;
    DECLARE result JSON;
	-- **************************** --
    DECLARE Contact_ID_UUID CHAR(36);
    SET Contact_ID_UUID = UUID();
    
    -- Check if the contact exists
    IF NOT EXISTS (SELECT 1 FROM emergency_contact WHERE emergency_contact.Employee_ID = p_employee_id AND 
														 emergency_contact.First_Name = p_first_name AND 
                                                         emergency_contact.Last_Name = p_last_name AND
                                                         emergency_contact.Phone = p_phone AND
                                                         emergency_contact.Email = p_email) THEN
                                                         
		INSERT INTO emergency_contact (Contact_ID, Employee_ID, First_Name, Last_Name, Phone, Email, Address, Relationship) 
				VALUES (Contact_ID_UUID, p_employee_id, p_first_name, p_last_name, p_phone, p_email, p_address, p_relationship);
		-- Return UUID of the contact
		SET _data = Contact_ID_UUID;
		SET success = True;
	ELSE
		SET _data = "Duplicate contacts";
	END IF;

	SELECT JSON_OBJECT('success', success, 'data', _data) INTO result;
    RETURN result;  -- Return the result
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_add_dependent` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_add_dependent`(
    p_dependent_name VARCHAR(20), 
    p_employee_ID CHAR(36), 
    p_relationship VARCHAR(20)
) RETURNS json
    MODIFIES SQL DATA
    DETERMINISTIC
BEGIN
	DECLARE _data VARCHAR(100) DEFAULT "NULL";
    DECLARE success BOOLEAN DEFAULT FALSE;
    DECLARE result JSON;
	-- **************************** --

    -- Check if the dependent_info exists
    IF NOT EXISTS (SELECT 1 FROM dependent_info WHERE dependent_info.Name = p_dependent_name AND dependent_info.Employee_ID = p_employee_ID AND dependent_info.Relationship = p_relationship) THEN
        -- Insert new dependent record
		IF EXISTS (SELECT 1 FROM employee WHERE employee.Employee_ID = p_employee_ID) THEN
			INSERT INTO dependent_info (Name, Employee_ID, Relationship) 
			VALUES (p_dependent_name, p_employee_ID, p_relationship);
            -- Set success to true for success
			SET success = True;
		ELSE
			SET _data = "Employee Not found. Check the employee id.";
		END IF;
    ELSE
        -- If the dependent_info exist, return false for failure
        SET _data = "Data already on the database.";
    END IF;
	SELECT JSON_OBJECT('success', success, 'data', _data) INTO result;
    RETURN result;  -- Return the result
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_add_leave_request` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_add_leave_request`(
	p_user_id VARCHAR(36),
    p_leave_type ENUM('Annual','Casual','Maternity','No_Pay'),
    p_start_date DATE,
    p_end_date DATE,
    p_reason VARCHAR(255),
    p_status ENUM('Approve','Reject','Pending')
) RETURNS json
    MODIFIES SQL DATA
    DETERMINISTIC
BEGIN 

    DECLARE _data VARCHAR(100) DEFAULT "NULL"; 
    DECLARE success BOOLEAN DEFAULT FALSE; 
    DECLARE result JSON; 
    DECLARE request_ID_UUID CHAR(36); 

    -- Generate a new UUID for the request
    SET request_ID_UUID = UUID(); 

    -- Insert data into the leave_request table only if user_id is provided
    IF p_user_id IS NOT NULL THEN
        INSERT INTO leave_request(
            Request_ID, User_ID, Leave_Type, Start_Date, End_Date, Reason, Status
        )  
        VALUES(
            request_ID_UUID,p_user_id,p_leave_type,p_start_date,p_end_date,p_reason,p_status
        );
        SET _data = request_ID_UUID; -- Set the returned UUID to _data
        SET success = TRUE; -- Mark success as TRUE
    ELSE
        SET success = FALSE; -- Mark success as FALSE if user_id is NULL
    END IF;

    -- Return JSON object with success status and UUID of the request
    SELECT JSON_OBJECT('success', success, 'data', _data) INTO result; 
    RETURN result;  -- Return the result as JSON

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_add_picture` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_add_picture`(
    p_path VARCHAR(255)
) RETURNS json
    MODIFIES SQL DATA
    DETERMINISTIC
BEGIN
	DECLARE _data VARCHAR(100) DEFAULT "NULL";
    DECLARE success BOOLEAN DEFAULT FALSE;
    DECLARE result JSON;
	-- **************************** --
    DECLARE Pic_ID_UUID CHAR(36);
    SET Pic_ID_UUID = UUID();
    
    INSERT INTO employee_pic (Pic_ID, Path) 
            VALUES (Pic_ID_UUID, p_path);
    
	-- Return UUID of the picture
	SET _data = Pic_ID_UUID;
    SET success = True;

	SELECT JSON_OBJECT('success', success, 'data', _data) INTO result;
    RETURN result;  -- Return the result
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_change_password` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_change_password`(
    p_user_ID CHAR(36),
    p_password VARCHAR(60)
) RETURNS json
    READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE data JSON DEFAULT NULL;
    DECLARE result JSON;
    DECLARE success BOOLEAN DEFAULT FALSE;
 
    -- Check if emergency contacts exist for the given employee
    IF EXISTS (SELECT * FROM user WHERE user.User_ID = p_user_ID) THEN
if not EXISTS (SELECT * FROM user WHERE user.User_ID = p_user_ID and user.Password=p_password) then
UPDATE user SET `Password` =p_password  WHERE (`User_ID` = p_user_ID);
            SET success = TRUE;
else
set success=false;
            set data=JSON_OBJECT('message', 'Password is the same');
end if;

    ELSE
        -- If no emergency contacts found
        SET data = JSON_OBJECT('message', 'NO user found');
        SET success = FALSE;
    END IF;
 
    -- Return the final result with success flag
    SET result = JSON_OBJECT(
        'data', data,
        'success', success
    );
 
    RETURN result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_createNewCustomField` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_createNewCustomField`(
    p_field_name VARCHAR(20)
) RETURNS json
    MODIFIES SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE _data JSON;
    DECLARE success BOOLEAN DEFAULT FALSE;
    DECLARE result JSON;
    DECLARE next_id INT;
    
    -- Check if the field already exists
    IF NOT EXISTS (SELECT 1 FROM custom_field WHERE Field_Name = p_field_name) THEN
        -- Find the next available Field_ID
        SET next_id = (SELECT COALESCE(MAX(Field_ID), 0) + 1 FROM custom_field);
        -- Insert the new field
        INSERT INTO custom_field (Field_ID, Field_Name) VALUES (next_id, p_field_name);
        
        -- Set success to TRUE and message
        SET success = TRUE;
        SET _data = JSON_QUOTE("Added successfully");
    ELSE
        SET _data = JSON_QUOTE("Already in the database");
    END IF;

    -- Return the success status and data as JSON
    SET result = JSON_OBJECT('success', success, 'data', _data);
    RETURN result;  -- Return the result
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_deleteCustomField` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_deleteCustomField`(
    p_field_name VARCHAR(20)
) RETURNS json
    MODIFIES SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE _data JSON;
    DECLARE success BOOLEAN DEFAULT FALSE;
    DECLARE result JSON;
    DECLARE ID INT;
    
    -- Check if the field exists
    IF EXISTS (SELECT 1 FROM custom_field WHERE custom_field.Field_Name = p_field_name) THEN
        -- Fetch the ID of the custom field
        SELECT Field_ID FROM custom_field WHERE custom_field.Field_Name = p_field_name INTO ID;
        
        -- Delete the corresponding employee custom fields linked to this ID
        IF EXISTS (SELECT 1 FROM employee_custom_field WHERE employee_custom_field.Field_ID = ID) THEN
			 DELETE FROM employee_custom_field WHERE employee_custom_field.Field_ID = ID;
		END IF;
        
        -- Delete the custom field itself
		DELETE FROM custom_field WHERE custom_field.Field_ID = ID;
        
        -- Set success to TRUE and a success message
        SET success = TRUE;
        SET _data = JSON_QUOTE('Deleted successfully');  -- Use JSON_QUOTE to properly format the string as JSON
    ELSE
        -- Set an error message when the field is not found
        SET _data = JSON_QUOTE('Not in the database');   -- Use JSON_QUOTE here as well
    END IF;

    -- Return the success status and message as JSON
    SET result = JSON_OBJECT('success', success, 'data', _data);
    RETURN result;  -- Return the final result
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_deleteEmployeePic` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_deleteEmployeePic`( 
    p_Path VARCHAR(255) 
) RETURNS json
    MODIFIES SQL DATA
    DETERMINISTIC
BEGIN 
    DECLARE _data JSON; 
    DECLARE success BOOLEAN DEFAULT FALSE; 
    DECLARE result JSON; 
 
    DECLARE PIC_I CHAR(36); 
 
    -- Check if the picture exists 
 
    IF EXISTS (SELECT 1 FROM employee_pic WHERE employee_pic.Path = p_Path) THEN 
        -- Fetch the ID of the picture
        SELECT Pic_ID FROM employee_pic WHERE employee_pic.Path = p_Path INTO PIC_I; 
        -- Set the corresponding employee pic path to null linked to this PIC_ID 
        IF EXISTS (SELECT 1 FROM employee WHERE employee.Pic_ID = PIC_ID) THEN 
UPDATE employee SET employee.Pic_ID = NULL WHERE Employee.Pic_ID = PIC_I; 
 
END IF; 
        -- Delete the Picture itself 
DELETE FROM employee_pic WHERE employee_pic.Pic_ID = PIC_I; 
 
        -- Set success to TRUE and a success message 
 
        SET success = TRUE; 
 
        SET _data = JSON_QUOTE('Deleted successfully');  -- Use JSON_QUOTE to properly format the string as JSON 
 
    ELSE 
 
        -- Set an error message when the field is not found 
 
        SET _data = JSON_QUOTE('Not in the database');   -- Use JSON_QUOTE here as well 
 
    END IF; 
 
    -- Return the success status and message as JSON 
 
    SET result = JSON_OBJECT('success', success, 'data', _data); 
 
    RETURN result;  -- Return the final result 
 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_deleteUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_deleteUser`( 
    p_UserID CHAR(36) 
) RETURNS json
    MODIFIES SQL DATA
    DETERMINISTIC
BEGIN 
    DECLARE _data JSON; 
    DECLARE success BOOLEAN DEFAULT FALSE; 
    DECLARE result JSON; 
    
    -- Check if the user exists 
 
    IF EXISTS (SELECT 1 FROM User WHERE user.User_ID = p_UserID) THEN 
    
-- delete notifications according to user id if exists
        
        IF EXISTS (SELECT 1 FROM notification WHERE notification.User_ID = p_UserID) THEN
DELETE FROM notification WHERE notification.User_ID = p_UserID;
END IF;
        
        -- delete leave requests according to user id if exists
        
        IF EXISTS (SELECT 1 FROM leave_request WHERE leave_request.User_ID = p_UserID) THEN
DELETE FROM leave_request WHERE leave_request.User_ID = p_UserID;
END IF;
        
        -- Delete the User itself
        
DELETE FROM user WHERE user.User_ID = p_UserID; 
 
        -- Set success to TRUE and a success message 
 
        SET success = TRUE; 
 
        SET _data = JSON_QUOTE('Deleted successfully');  
 
    ELSE 
 
        -- Set an error message when the field is not found 
 
        SET _data = JSON_QUOTE('Not in the database');   
 
    END IF; 
 
    -- Return the success status and message as JSON 
 
    SET result = JSON_OBJECT('success', success, 'data', _data); 
 
    RETURN result;  -- Return the final result 
 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_edit_request_status` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_edit_request_status`( 
    p_request_ID CHAR(36),
    p_status ENUM("Approve","Reject","Pending") 
) RETURNS json
    MODIFIES SQL DATA
    DETERMINISTIC
BEGIN 
    DECLARE result JSON; 
    DECLARE success BOOLEAN DEFAULT FALSE; 
    
     IF EXISTS (SELECT * FROM leave_request WHERE leave_request.Request_ID = p_request_ID) THEN 
UPDATE leave_request 
SET Status = p_status 
WHERE Request_ID = p_request_ID; 
 
        SET success = TRUE; 
        SET result = JSON_OBJECT('success', success); 
    ELSE 
        SET success = FALSE; 
         SET result = JSON_OBJECT( 
        'success', success 
    ); 
    END IF; 
    RETURN result; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_getcustomfield_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_getcustomfield_data`( 
 
    p_employee_ID CHAR(36)
 
) RETURNS json
    MODIFIES SQL DATA
    DETERMINISTIC
BEGIN 
 
    DECLARE _data JSON; 
 
    DECLARE success BOOLEAN DEFAULT FALSE; 
 
    DECLARE result JSON; 


    -- Check if the field exists 
    IF EXISTS (SELECT 1 FROM employee_custom_field WHERE employee_custom_field.Employee_ID = p_employee_ID) THEN 
        -- Fetch the ID of the custom field 
        SELECT JSON_ARRAYAGG( 
            JSON_OBJECT('Field', custom_field.Field_Name,'Data',employee_custom_field.Data) 
        ) INTO _data  FROM employee_custom_field inner join custom_field on employee_custom_field.Field_ID=custom_field.Field_ID where employee_custom_field.Employee_ID = p_employee_ID;
set success=true;
else
set _data=JSON_OBJECT('message', 'No custom fields for this employee found');
        set success=false;
end if;
    SET result = JSON_OBJECT( 
        'data', _data, 
        'success', success 
    ); 
    return result;   
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_getleave_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_getleave_data`( 
 
) RETURNS json
    READS SQL DATA
    DETERMINISTIC
BEGIN 
 
    DECLARE _data JSON; 
 
    DECLARE success BOOLEAN DEFAULT FALSE; 
 
    DECLARE result JSON; 
 
    -- Check if the field exists 
 
    IF EXISTS (SELECT 1 FROM pay_grade) THEN 
 
        -- Fetch the ID of the custom field 
 
        SELECT JSON_ARRAYAGG( 
 
            JSON_OBJECT('PayGrade_ID', pay_grade.PayGrade_ID,
            'Pay_Grade_Level',pay_grade.Pay_Grade_Level,
            'Annual',pay_grade.Annual,
            'Casual',pay_grade.Casual,
            'Maternity',pay_grade.Maternity,
            'No_Pay',pay_grade.No_Pay) 
 
        ) INTO _data from pay_grade;
set success=true;
else
set _data=JSON_OBJECT('message', 'Error  on pay_grade table');
        set success=false;
end if;
    SET result = JSON_OBJECT( 
 
        'data', _data, 
 
        'success', success 
 
    ); 
    return result;
         
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_getMail_apprej` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_getMail_apprej`(  
    p_Request_ID CHAR(36) 
) RETURNS json
    READS SQL DATA
    DETERMINISTIC
BEGIN  
    DECLARE _data JSON;  
    DECLARE success BOOLEAN DEFAULT FALSE;  
    DECLARE supervisor_emp_id char(36);  
    DECLARE result JSON;  
     
    IF EXISTS (SELECT * FROM leave_request WHERE leave_request.Request_ID = p_Request_ID) THEN
    select JSON_OBJECT('Email',employee.Email_Work) into _data from leave_request inner join user on leave_request.User_ID=user.User_ID inner join employee on user.Employee_ID=employee.Employee_ID where leave_request.Request_ID=p_Request_ID;
SET success = true; 
else
     set success =false;
end if;
    
    SET result = JSON_OBJECT('success', success, 'data', _data); 
  
    RETURN result; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_getMail_supervisor` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_getMail_supervisor`(  
    p_Request_ID CHAR(36) 
) RETURNS json
    READS SQL DATA
    DETERMINISTIC
BEGIN  
    DECLARE _data JSON;  
    DECLARE success BOOLEAN DEFAULT FALSE;  
    DECLARE supervisor_emp_id char(36);  
    DECLARE result JSON;  
     
    IF EXISTS (SELECT * FROM leave_request WHERE leave_request.Request_ID = p_Request_ID) THEN
    select JSON_OBJECT('Email',employee.Email_Work) into _data from leave_request inner join user on leave_request.User_ID=user.User_ID inner join employee_supervisor on user.Employee_ID=employee_supervisor.Employee_ID inner join employee on employee.Employee_ID=employee_supervisor.Supervisor_ID where leave_request.Request_ID=p_Request_ID;
SET success = true; 
else
     set success =false;
end if;
    
    SET result = JSON_OBJECT('success', success, 'data', _data); 
  
    RETURN result; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_get_available_custom_fields` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_get_available_custom_fields`(
) RETURNS json
    READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE _data JSON;
    DECLARE success BOOLEAN DEFAULT FALSE;
    DECLARE result JSON;
    
    -- Fetch and format the dropdown data
    SELECT JSON_OBJECT(
        'custom_fields', (
            SELECT JSON_ARRAYAGG(Field_Name) 
            FROM custom_field
        )
    ) INTO _data;
    
    -- Set success to TRUE
    SET success = TRUE;

    -- Return the success status and data as JSON
    SET result = JSON_OBJECT('success', success, 'data', _data);
    RETURN result;  -- Return the result
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_get_dependants` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_get_dependants`(
    p_employee_ID CHAR(36)
) RETURNS json
    READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE dependant_data JSON DEFAULT NULL;
    DECLARE result JSON;
    DECLARE success BOOLEAN DEFAULT FALSE;
 
    -- Check if dependants exist for the given employee
    IF EXISTS (SELECT * FROM dependent_info WHERE dependent_info.Employee_ID = p_employee_ID) THEN
        -- Aggregate all dependants into a JSON array
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT('Name', dependent_info.Name, 'Relationship', dependent_info.Relationship)
        ) INTO dependant_data
        FROM dependent_info 
        WHERE dependent_info.Employee_ID = p_employee_ID;
        
        SET success = TRUE;
    ELSE
        -- If no dependants exist, return an empty array
        SET dependant_data = JSON_OBJECT('message', 'No dependants found');
        SET success = FALSE;
    END IF;
 
    -- Return the final result with success flag
    SET result = JSON_OBJECT(
        'data', dependant_data,
        'success', success
    );
 
    RETURN result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_get_dropdown_options` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_get_dropdown_options`() RETURNS json
    READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE _data JSON;
    DECLARE success BOOLEAN DEFAULT FALSE;
    DECLARE result JSON;
    
    -- Fetch and format the dropdown data
    SELECT JSON_OBJECT(
        'departments', (
            SELECT JSON_ARRAYAGG(JSON_OBJECT('id', Dept_ID, 'name', Dept_Name)) 
            FROM department
        ),
        'titles', (
            SELECT JSON_ARRAYAGG(JSON_OBJECT('id', Title_ID, 'name', Title)) 
            FROM job_title
        ),
        'employment_statuses', (
            SELECT JSON_ARRAYAGG(JSON_OBJECT('id', Employment_Stat_ID, 'name', Employment_Stat_Type)) 
            FROM employment_status
        ),
        'branches', (
			SELECT JSON_ARRAYAGG(JSON_OBJECT('id', Branch_ID, 'name', Branch_Name)) 
            FROM branch
        ),
        'pay_grades', (
			SELECT JSON_ARRAYAGG(JSON_OBJECT('id', PayGrade_ID, 'name', Pay_Grade_Level)) 
            FROM pay_grade
		), 
        'organization', (
			SELECT JSON_ARRAYAGG(JSON_OBJECT('id', Organization_ID, 'name', organization_name)) 
            FROM organization
        ),
        'cutom_field', (
			SELECT JSON_ARRAYAGG(JSON_OBJECT('id', Field_ID, 'name', Field_Name)) 
            FROM custom_field
        ),
        'pay_grade', (
			SELECT JSON_ARRAYAGG(JSON_OBJECT('id', PayGrade_ID, 'name', Pay_Grade_Level)) 
            FROM pay_grade
        )
    ) INTO _data;
    
    -- Set success to TRUE
    SET success = TRUE;

    -- Return the success status and data as JSON
    SET result = JSON_OBJECT('success', success, 'data', _data);
    RETURN result;  -- Return the result
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_get_emergency_contact` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_get_emergency_contact`(
    p_employee_ID CHAR(36)
) RETURNS json
    READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE emergency_data JSON DEFAULT NULL;
    DECLARE result JSON;
    DECLARE success BOOLEAN DEFAULT FALSE;
 
    -- Check if emergency contacts exist for the given employee
    IF EXISTS (SELECT * FROM emergency_contact WHERE emergency_contact.Employee_ID = p_employee_ID) THEN
        SELECT JSON_ARRAYAGG(
JSON_OBJECT(
'Contact Name', CONCAT(emergency_contact.First_Name, ' ', emergency_contact.Last_Name),
'Phone number', emergency_contact.Phone,
'Email', emergency_contact.Email,
'Address', emergency_contact.Address,
'Relationship', emergency_contact.Relationship
)
) INTO emergency_data
        FROM emergency_contact 
        WHERE emergency_contact.Employee_ID = p_employee_ID;
 
        SET success = TRUE;
    ELSE
        -- If no emergency contacts found
        SET emergency_data = JSON_OBJECT('message', 'No emergency contacts found');
        SET success = FALSE;
    END IF;
 
    -- Return the final result with success flag
    SET result = JSON_OBJECT(
        'data', emergency_data,
        'success', success
    );
 
    RETURN result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_get_employee_details` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_get_employee_details`(
    p_employee_ID CHAR(36)
) RETURNS json
    READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE employee_data JSON DEFAULT NULL;
    DECLARE dependant_data JSON DEFAULT NULL;
    DECLARE supervisor_data JSON DEFAULT NULL;
    DECLARE emergency_contact JSON DEFAULT NULL;
    DECLARE temp JSON DEFAULT NULL;
   
    DECLARE team_data JSON DEFAULT NULL;
    DECLARE pic_data JSON DEFAULT NULL;
    DECLARE data JSON DEFAULT NULL;
    DECLARE success BOOLEAN DEFAULT FALSE;
 
    DECLARE result JSON;
 
    IF EXISTS (SELECT * FROM employee WHERE Employee_ID = p_employee_ID) THEN
        -- Fetch employee data
        SELECT JSON_ARRAY(
            JSON_OBJECT('Employee_ID', employee.Employee_ID),
            JSON_OBJECT('NIC', employee.NIC),
            JSON_OBJECT('Initials', employee.Initials),
            JSON_OBJECT('First_Name', employee.First_Name),
            JSON_OBJECT('Last_Name', employee.Last_Name),
            JSON_OBJECT('Date_of_Birth', employee.Date_of_Birth),
            JSON_OBJECT('Gender', employee.Gender),
            JSON_OBJECT('Marital_Status', employee.Marital_Status),
            JSON_OBJECT('Phone', employee.Phone),
            JSON_OBJECT('Email_Work', employee.Email_Work),
            JSON_OBJECT('Email_private', employee.Email_private),
            JSON_OBJECT('Address', employee.Address),
            JSON_OBJECT('Deptartment_Name', department.Dept_Name),
            JSON_OBJECT('Branch_Name', branch.Branch_Name),
            JSON_OBJECT('Title', job_title.Title),
            JSON_OBJECT('Employment_Status', employment_status.Employment_Stat_Type)
        ) INTO employee_data
        FROM employee 
        INNER JOIN department ON employee.Dept_ID = department.Dept_ID inner join branch on department.Branch_ID=branch.Branch_ID 
        INNER JOIN job_title ON employee.Title_ID = job_title.Title_ID 
        INNER JOIN employment_status ON employee.Employment_Stat_ID = employment_status.Employment_Stat_ID
        WHERE employee.Employee_ID = p_employee_ID;
 
        -- Fetch dependant data if exists
        set temp=db_get_dependants(p_employee_ID);
        IF JSON_UNQUOTE(JSON_EXTRACT(temp, '$.success')) = 1 THEN
            SET dependant_data = JSON_UNQUOTE(JSON_EXTRACT(temp, '$.data'));
        END IF;
       #SET dependant_data = db_get_dependants(p_employee_ID);
 
        -- Fetch supervisor data if exists
        
        set temp=db_get_superviser(p_employee_ID);
        IF JSON_UNQUOTE(JSON_EXTRACT(temp, '$.success')) = 1 THEN
            SET supervisor_data = JSON_UNQUOTE(JSON_EXTRACT(temp, '$.data'));
        END IF;
        
        set temp=db_get_team(p_employee_ID);
        IF JSON_UNQUOTE(JSON_EXTRACT(temp, '$.success')) = 1 THEN
            SET team_data = JSON_UNQUOTE(JSON_EXTRACT(temp, '$.data'));
        END IF;
        set temp=db_get_emergency_contact(p_employee_ID);
        IF JSON_UNQUOTE(JSON_EXTRACT(temp, '$.success')) = 1 THEN
            SET emergency_contact = JSON_UNQUOTE(JSON_EXTRACT(temp, '$.data'));
        END IF;
        
        set temp=db_get_employee_pic(p_employee_ID);
        IF JSON_UNQUOTE(JSON_EXTRACT(temp, '$.success')) = 1 THEN
            SET pic_data = JSON_UNQUOTE(JSON_EXTRACT(temp, '$.data'));
        END IF;
       
   

       
 
        -- Fetch picture data if exists
        
 
        -- Combine all data into the data object
        SET data = JSON_OBJECT(
            'Employee_Data', employee_data,
            'Dependant_Data', dependant_data,
            'Supervisor_Data', supervisor_data,
            'Pic_Data', pic_data,
            'Team_Data', team_data,
            'Emergency_Contacts',emergency_contact
        );
 
        -- Set success to true
        SET success = TRUE;
    ELSE
        -- If employee doesn't exist
        SET data = JSON_OBJECT('message', 'Employee does not exist');
        SET success = FALSE;
    END IF;
 
    -- Return the final result as a JSON object
    SET result = JSON_OBJECT(
        'data', data,
        'success', success
    );
 
    RETURN result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_get_employee_dropdown_options` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_get_employee_dropdown_options`(
) RETURNS json
    READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE _data JSON;
    DECLARE success BOOLEAN DEFAULT FALSE;
    DECLARE result JSON;
    
    -- Fetch and format the dropdown data
    SELECT JSON_OBJECT(
        'departments', (
        SELECT JSON_ARRAYAGG(
            CONCAT(department.Dept_ID, ' : ', Dept_Name, ' : [ ', branch.Branch_Name, ' ]')
        )
        FROM department
        INNER JOIN branch ON department.Branch_ID = branch.Branch_ID
		),
        'titles', (
            SELECT JSON_ARRAYAGG(Title) 
            FROM job_title
        ),
        'paygrades', (
            SELECT JSON_ARRAYAGG(Pay_Grade_Level) 
            FROM pay_grade
        ),
        'employment_statuses', (
            SELECT JSON_ARRAYAGG(Employment_Stat_Type) 
            FROM employment_status
        ),
        'employee_list', (
            SELECT JSON_ARRAYAGG(CONCAT(employee.Initials, employee.First_Name, " ", employee.Last_Name, ' [ NIC : ', employee.NIC, ' ]')) 
            FROM employee
        )
    ) INTO _data;
    
    -- Set success to TRUE
    SET success = TRUE;

    -- Return the success status and data as JSON
    SET result = JSON_OBJECT('success', success, 'data', _data);
    RETURN result;  -- Return the result
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_get_employee_leave_details` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_get_employee_leave_details`(
    p_nic VARCHAR(20),   -- NIC to search for
    p_name VARCHAR(60)   -- Full name to search for
) RETURNS json
    MODIFIES SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE _data JSON;
    DECLARE leave_requests_data JSON;
    DECLARE total_annual INT DEFAULT 0;
    DECLARE total_casual INT DEFAULT 0;
    DECLARE total_maternity INT DEFAULT 0;
    DECLARE total_no_pay INT DEFAULT 0;
    DECLARE total_leaves INT DEFAULT 0;
    DECLARE employee_full_name VARCHAR(60);
    DECLARE profile_pic VARCHAR(255);
    DECLARE temp_employee_ID CHAR(36);
    DECLARE result JSON;
    DECLARE success BOOLEAN DEFAULT FALSE;
 
    -- Fetch Employee_ID based on NIC or Name
    IF p_nic IS NOT NULL AND p_nic != '' THEN
        SELECT Employee_ID INTO temp_employee_ID
        FROM employee e 
        WHERE e.NIC = p_nic;
    ELSEIF p_name IS NOT NULL AND p_name != '' THEN
        SELECT Employee_ID INTO temp_employee_ID
        FROM employee e 
        WHERE CONCAT(e.First_Name, ' ', e.Last_Name) LIKE CONCAT('%', p_name, '%');
    END IF;
 
    -- Check if Employee_ID was found
    IF temp_employee_ID IS NULL THEN
        RETURN JSON_OBJECT('success', FALSE, 'data', 'No such employee in the database');
    ELSE
        -- Fetch employee details including remaining leave counts and profile picture
        SELECT 
            CONCAT(e.First_Name, ' ', e.Last_Name), 
            e.NIC,
            ldb.Annual,
            ldb.Casual,
            ldb.Maternity,
            ldb.No_Pay,
            ldb.Total_Leave_Count,
            ep.path
        INTO 
            employee_full_name, 
            p_nic,
            total_annual, 
            total_casual, 
            total_maternity, 
            total_no_pay, 
            total_leaves, 
            profile_pic
        FROM 
            employee e
        JOIN 
            leave_data_balance ldb ON e.Employee_ID = ldb.Employee_ID
        LEFT JOIN employee_pic ep ON ep.Pic_ID = e.Pic_ID
        WHERE 
            e.Employee_ID = temp_employee_ID;
 
        -- Create JSON object for employee details
        SET _data = JSON_OBJECT(
            'Full_Name', employee_full_name,
            'NIC', p_nic,
            'Remaining_Annual', total_annual,
            'Remaining_Casual', total_casual,
            'Remaining_Maternity', total_maternity,
            'Remaining_No_Pay', total_no_pay,
            'Total_Leave_Count', total_leaves,
            'Profile_Pic', profile_pic
        );
 
        -- Fetch leave requests for the employee
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'Start_Date', lr.Start_Date,
                'End_Date', lr.End_Date,
                'Reason', lr.Reason,
                'Status', lr.Status
            )
        ) INTO leave_requests_data
        FROM leave_request lr
        JOIN user u ON lr.User_ID = u.User_ID
        WHERE u.Employee_ID = temp_employee_ID;
 
        -- Check if leave requests data is available
        IF leave_requests_data IS NULL THEN
            SET leave_requests_data = JSON_OBJECT('message', 'User has no leave requests yet');
        ELSE
            SET success = TRUE;
        END IF;
 
        -- Set final result JSON
        SET result = JSON_OBJECT(
            'success', success,
            'data', _data,
            'leave_requests_of_user', leave_requests_data
        );
 
        RETURN result;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_get_employee_list` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_get_employee_list`(
) RETURNS json
    READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE _data JSON;
    DECLARE success BOOLEAN DEFAULT FALSE;
    DECLARE result JSON;
    
    -- Fetch and format the dropdown data
    SELECT JSON_OBJECT(
        'employee_list', (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'initials', employee.Initials,
                    'first_Name', employee.First_Name,
                    'last_Name', employee.Last_Name,
                    'NIC', employee.NIC
                )
            ) 
            FROM employee
        )
    ) INTO _data;
    
    -- Set success to TRUE
    SET success = TRUE;

    -- Return the success status and data as JSON
    SET result = JSON_OBJECT('success', success, 'data', _data);
    RETURN result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_get_employee_pic` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_get_employee_pic`(
    p_employee_ID CHAR(36)
) RETURNS json
    READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE pic_data JSON DEFAULT NULL;
    DECLARE result JSON;
    DECLARE success BOOLEAN DEFAULT FALSE;
 
    -- Check if dependants exist for the given employee
     IF EXISTS (SELECT * FROM employee_pic INNER JOIN employee ON employee_pic.Pic_ID = employee.Pic_ID WHERE employee.Employee_ID = p_employee_ID) THEN
            SELECT JSON_OBJECT(
                'pic_path', employee_pic.Path
            ) INTO pic_data
            FROM employee_pic 
            INNER JOIN employee ON employee_pic.Pic_ID = employee.Pic_ID
            WHERE employee.Employee_ID = p_employee_ID;
        
        
        SET success = TRUE;
    ELSE
        -- If no dependants exist, return an empty array
        SET pic_data = JSON_OBJECT('message', 'No photo found');
        SET success = FALSE;
    END IF;
 
    -- Return the final result with success flag
    SET result = JSON_OBJECT(
        'data', pic_data,
        'success', success
    );
 
    RETURN result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_get_leave_requests_by_supervisor` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_get_leave_requests_by_supervisor`( 
    p_supervisor_user_id CHAR(36)
) RETURNS json
    READS SQL DATA
    DETERMINISTIC
BEGIN 
    DECLARE _data JSON; 
    DECLARE success BOOLEAN DEFAULT FALSE; 
    DECLARE supervisor_emp_id char(36); 
    DECLARE result JSON; 
    
    SELECT employee_id 
    INTO supervisor_emp_id
    FROM User
    WHERE user_id = p_supervisor_user_id;
 
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'Employee_ID', E.employee_id,
     'Employee_NIC',E.NIC,
            'First_Name',E.First_Name,
            'Last_Name',E.Last_Name,
            'Leave_Type', LR.Leave_Type,
            'Start_Date', LR.Start_Date,
            'End_Date', LR.End_Date,
            'Reason', LR.Reason,
            'Status', LR.Status
        )
    ) INTO _data
    FROM Employee E
    join user U on U.Employee_ID = E.Employee_ID
    JOIN leave_request LR ON U.user_id = LR.user_id
    WHERE E.employee_id IN (
        SELECT employee_id 
        FROM employee_supervisor 
        WHERE supervisor_id = supervisor_emp_id
    );
 
    -- Step 5: Set success flag and result
    SET success = (_data IS NOT NULL);
    SET result = JSON_OBJECT('success', success, 'data', _data);
 
    RETURN result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_get_leave_requests_by_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_get_leave_requests_by_user`( 
    p_user_id char(36)
) RETURNS json
    READS SQL DATA
    DETERMINISTIC
BEGIN 
    DECLARE _data JSON; 
    DECLARE success BOOLEAN DEFAULT FALSE; 
    DECLARE result JSON; 
 
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'Leave_Type', Leave_Type,
            'Start_Date', Start_Date,
            'End_Date', End_Date,
            'Reason', Reason,
            'Status', Status
        )
    ) INTO _data 
    FROM leave_request 
    WHERE User_ID = p_user_id;
 
    SET success = (_data IS NOT NULL);
 
    SET result = JSON_OBJECT('success', success, 'data', _data); 
 
    RETURN result; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_get_Pending_Leave_Requests_for_a_supervisor` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_get_Pending_Leave_Requests_for_a_supervisor`(
    p_user_id CHAR(36)
) RETURNS json
    READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE result JSON;
    DECLARE _data JSON;
    DECLARE temp_employee_id CHAR(36);
 
    -- Step 1: Fetch the Employee_ID of the supervisor using the given User_ID
    SELECT Employee_ID INTO temp_employee_id
    FROM user
    WHERE User_ID = p_user_id;
 
    -- Step 2: Check for pending leave requests for the employees supervised by this supervisor
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'Req_ID', lr.Request_ID,
            'Name', CONCAT(e.First_Name, ' ', e.Last_Name),
            'NIC', e.NIC,
            'Start_Date', lr.Start_Date,
            'End_Date', lr.End_Date,
            'Reason', lr.Reason
        )
    ) INTO _data
    FROM employee e 
    JOIN user u ON u.Employee_ID = e.Employee_ID
    JOIN leave_request lr ON lr.User_ID = u.User_ID
    WHERE lr.Status = 'Pending' 
    AND u.User_ID IN (
        SELECT u.User_ID
        FROM employee_supervisor es
        JOIN user u ON u.Employee_ID = es.Employee_ID
        WHERE es.Supervisor_ID = temp_employee_id
    );
 
    -- Step 3: Check if data is fetched and prepare the result accordingly
    IF _data IS NULL OR JSON_LENGTH(_data) = 0 THEN
        SET result = JSON_OBJECT('success', FALSE, 'message', 'There are no requests');
    ELSE
        SET result = JSON_OBJECT('success', TRUE, 'data', _data);
    END IF;
 
    -- Return the result
    RETURN result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_get_superviser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_get_superviser`(
    p_employee_ID CHAR(36)
) RETURNS json
    READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE supervisor_data JSON DEFAULT NULL;
    DECLARE result JSON;
    DECLARE success BOOLEAN DEFAULT FALSE;
 
    -- Check if supervisor exists for the given employee
    IF EXISTS (SELECT * FROM employee_supervisor WHERE employee_supervisor.Employee_ID = p_employee_ID) THEN
        SELECT JSON_OBJECT(
            'Supervisor', CONCAT(employee.Initials, ' ', employee.First_Name, ' ', employee.Last_Name)
        ) INTO supervisor_data
        FROM employee_supervisor 
        INNER JOIN employee ON employee.Employee_ID = employee_supervisor.Supervisor_ID
        WHERE employee_supervisor.Employee_ID = p_employee_ID;
 
        SET success = TRUE;
    ELSE
        -- If no supervisor exists
        SET supervisor_data = JSON_OBJECT('message', 'No supervisor found');
        SET success = FALSE;
    END IF;
 
    -- Return the final result with success flag
    SET result = JSON_OBJECT(
        'data', supervisor_data,
        'success', success
    );
 
    RETURN result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_get_tables` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_get_tables`() RETURNS json
    READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE _data JSON DEFAULT NULL;
    DECLARE result JSON;
    DECLARE success BOOLEAN DEFAULT FALSE;

    -- Use JSON_ARRAYAGG to collect all table names into a JSON array
    SELECT JSON_ARRAYAGG(table_name) 
    INTO _data
    FROM information_schema.tables
    WHERE table_schema = 'hrms';

    -- Set success to true if tables are found
    IF _data IS NOT NULL THEN
        SET success = TRUE;
    END IF;

    -- Return the final result with success flag
    SET result = JSON_OBJECT(
        'data', _data,
        'success', success
    );

    RETURN result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_get_user_dropdown_options` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_get_user_dropdown_options`(
) RETURNS json
    READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE _data JSON;
    DECLARE success BOOLEAN DEFAULT FALSE;
    DECLARE result JSON;
    
	-- Fetch and format the dropdown data
	SELECT JSON_OBJECT(
		'user_accounts', (
			SELECT JSON_ARRAYAGG(
				JSON_OBJECT(
					'initials', employee.Initials,
					'first_Name', employee.First_Name,
					'last_Name', employee.Last_Name,
					'NIC', employee.NIC,
					'User_Name', user.User_Name,
					'User_ID', user.User_ID
				)
			)
			FROM employee
			LEFT JOIN user ON employee.Employee_ID = user.Employee_ID
			WHERE user.User_ID IS NOT NULL  -- Include only employees with user accounts
		),
		'non_account_employees', (
			SELECT JSON_ARRAYAGG(
				JSON_OBJECT(
					'initials', employee.Initials,
					'first_Name', employee.First_Name,
					'last_Name', employee.Last_Name,
					'NIC', employee.NIC
				)
			) 
			FROM employee
			LEFT JOIN user ON employee.Employee_ID = user.Employee_ID
			WHERE user.User_ID IS NULL  -- Include only employees without user accounts
		)
	) INTO _data;

    
    -- Set success to TRUE
    SET success = TRUE;

    -- Return the success status and data as JSON
    SET result = JSON_OBJECT('success', success, 'data', _data);
    RETURN result;  -- Return the result
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_get_user_notification` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_get_user_notification`(
    p_user_ID CHAR(36)
) RETURNS json
    READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE notifi_data JSON DEFAULT NULL;
    DECLARE result JSON;
    DECLARE success BOOLEAN DEFAULT FALSE;
 
    -- Check if dependants exist for the given employee
     IF EXISTS (SELECT * FROM notification WHERE notification.User_ID = p_user_ID) THEN
            SELECT JSON_ARRAYAGG(
            JSON_OBJECT('Notification',notification.Data,
'DateTime',notification.DateTime,
                        'Status',notification.Status
            ))
 INTO notifi_data
            FROM notification 
            
            WHERE notification.User_ID = p_user_ID;
        
        
        SET success = TRUE;
    ELSE
        -- If no dependants exist, return an empty array
        SET notifi_data = JSON_OBJECT('message', 'No notification found');
        SET success = FALSE;
    END IF;
 
    -- Return the final result with success flag
    SET result = JSON_OBJECT(
        'data', notifi_data,
        'success', success
    );
 
    RETURN result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_login_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_login_data`( 
p_username varchar(20)
) RETURNS json
    READS SQL DATA
    DETERMINISTIC
BEGIN 
 
    DECLARE _data JSON; 
 
    DECLARE success BOOLEAN DEFAULT FALSE; 
 
    DECLARE result JSON; 
 
    -- Check if the field exists 
 
    IF EXISTS (SELECT 1 FROM user where User_Name=p_username) THEN 
 
        -- Fetch the ID of the custom field 
 
        SELECT 
 
            JSON_OBJECT('User_ID', user.User_ID,
            'User_Name',user.User_Name,
            'Password',user.Password,
            'Employee_ID',user.Employee_ID,
            'Auth_Level',user.Auth_Level) 
 
         INTO _data from user where user.User_Name=p_username;
set success=true;
else
set _data=JSON_OBJECT('message', 'Error  on pay_grade table');
        set success=false;
end if;
    SET result = JSON_OBJECT( 
 
        'data', _data, 
 
        'success', success 
 
    ); 
    return result;
         
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_modify_supervisor` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_modify_supervisor`(
    p_employee_ID CHAR(36),
    p_supervisor_ID CHAR(36)
) RETURNS json
    MODIFIES SQL DATA
    DETERMINISTIC
BEGIN
	DECLARE _data VARCHAR(100) DEFAULT "NULL";
    DECLARE success BOOLEAN DEFAULT FALSE;
    DECLARE result JSON;
	-- **************************** --
	-- Check if the Employee_ID,Supervisor_ID exists in employee table
    IF (NOT EXISTS (SELECT 1 FROM employee WHERE employee.Employee_ID = p_employee_ID)) OR  (NOT EXISTS (SELECT 1 FROM employee WHERE employee.Employee_ID = p_supervisor_ID)) THEN
        SET _data = "Employee/Supervisor not found in the database";
        SELECT JSON_OBJECT('success', success, 'data', _data) INTO result;
		RETURN result;  -- Return the result
    END IF;

    -- Check if the Employee_ID exists
    IF NOT EXISTS (SELECT 1 FROM employee_supervisor WHERE employee_supervisor.Employee_ID = p_employee_ID) THEN
		-- Insert new superviosr record
		INSERT INTO employee_supervisor (Employee_ID, Supervisor_ID) 
		VALUES (p_employee_ID, p_supervisor_ID);
        SET success = true;
    ELSE
		-- If the Employee_ID exist, modify the superviosr
        UPDATE employee_supervisor
		SET employee_supervisor.Supervisor_ID = p_supervisor_ID
		WHERE employee_supervisor.Employee_ID = p_employee_ID;
		SET success = true;
    END IF;
	SELECT JSON_OBJECT('success', success, 'data', _data) INTO result;
    RETURN result;  -- Return the result
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_setleave_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_setleave_data`( 
p_PayGrade_ID INT,
    p_Annual INT,
    p_Casual INT,
    p_Maternity INT,
    p_NoPay INT
) RETURNS json
    MODIFIES SQL DATA
    DETERMINISTIC
BEGIN 
 
    DECLARE _data JSON; 
 
    DECLARE success BOOLEAN DEFAULT FALSE; 
 
    DECLARE result JSON; 
 
    -- Check if the field exists 
 
    IF EXISTS (SELECT 1 FROM pay_grade) THEN 
 
        -- Fetch the ID of the custom field 
UPDATE `hrms`.`pay_grade` SET `Annual` = p_Annual,`Casual`=p_Casual,`Maternity`=p_Maternity,`No_Pay`=p_NoPay  WHERE (`PayGrade_ID` = p_PayGrade_ID);
set success=true;
else
set _data=JSON_OBJECT('message', 'Error on pay_grade table');
        set success=false;
end if;
    SET result = JSON_OBJECT( 
 
        'data', _data, 
 
        'success', success 
 
    ); 
    return result;
         
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `db_update_user_notification` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `db_update_user_notification`(
    p_user_ID CHAR(36),p_datetime datetime
) RETURNS json
    MODIFIES SQL DATA
    DETERMINISTIC
BEGIN

    DECLARE result JSON;
    DECLARE success BOOLEAN DEFAULT FALSE;
 
    -- Check if dependants exist for the given employee
     IF EXISTS (SELECT * FROM notification WHERE notification.User_ID = p_user_ID and notification.DateTime=p_datetime) THEN
UPDATE notification
SET Status = true
WHERE User_ID = p_user_ID AND DateTime = p_datetime;
        
        
        SET success = TRUE;
        SET result = JSON_OBJECT('success', success);
    ELSE
        -- If no dependants exist, return an empty array
        
        SET success = FALSE;
         SET result = JSON_OBJECT(
        'message', "no such notification",
        'success', success
    );
    END IF;
 
    -- Return the final result with success flag
   
 
    RETURN result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_employee` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_employee`(
    IN p_NIC VARCHAR(20),
    IN p_initials VARCHAR(20),
    IN p_first_Name VARCHAR(20),
    IN p_last_Name VARCHAR(20),
    IN p_date_of_birth DATE,
    IN p_gender ENUM('Male', 'Female', 'Other'),
    IN p_marital_status ENUM('Married', 'Single'),
    IN p_phone VARCHAR(20),
    IN p_email_work VARCHAR(50),
    IN p_email_private VARCHAR(50),
    IN p_address VARCHAR(255),
    IN p_pic_path VARCHAR(255),
    IN p_dept_id int,
    IN p_title VARCHAR(20),
    IN p_paygrade ENUM('Level-1', 'Level-2', 'Level-3', 'Level-4'),
    IN p_employment_stat ENUM('Intern', 'Permanent', 'Contract', 'Freelance'),
    IN p_pf_number VARCHAR(50),
    IN p_supervisor_NIC VARCHAR(20),
    IN p_dependent_info JSON,
    IN p_emergency_contacts_info JSON,
    IN p_custom_fields JSON,
    OUT result JSON
)
    MODIFIES SQL DATA
BEGIN
	DECLARE _data VARCHAR(100) DEFAULT "NULL";
    DECLARE success BOOLEAN DEFAULT FALSE;
    
	-- **************************** --
    DECLARE Employee_ID_UUID CHAR(36);
    DECLARE Pic_ID_UUID CHAR(36);
    
    DECLARE i INT DEFAULT 0;
    DECLARE _count INT;
    
	DECLARE field_name VARCHAR(255);
    DECLARE field_value VARCHAR(255);
    DECLARE keys_count INT DEFAULT JSON_LENGTH(p_custom_fields);
    
    DECLARE tmp_leave_data JSON; 
    
    DECLARE result_json JSON;
    DECLARE success_status BOOLEAN;

    -- Labeled block to handle exits properly
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- In case of exception, roll back the transaction and set result
        SET result = JSON_OBJECT('success', FALSE, 'data', 'Error occurred during execution');
        ROLLBACK;
    END;

    -- Start of the labeled block
    add_employee_block: BEGIN

    -- Start transaction
    START TRANSACTION;

    -- Generate a new UUID for the employee
    SET Employee_ID_UUID = UUID();
    
    -- Check if NIC is already in the database
    IF EXISTS (SELECT 1 FROM employee WHERE NIC = p_NIC) THEN
		ROLLBACK; -- Manually roll back if this check fails
        SET _data = 'Error : Data duplicate. NIC already exists.';
        SET result = JSON_OBJECT('success', success, 'data', _data);
        LEAVE add_employee_block;
    END IF;
    
	-- Check if work email is already in the database
    IF EXISTS (SELECT 1 FROM employee WHERE Email_Work = p_email_work) THEN
		ROLLBACK; -- Manually roll back if this check fails
        SET _data = 'Error : Data duplicate. Work email already exists.';
        SET result = JSON_OBJECT('success', success, 'data', _data);
        LEAVE add_employee_block;
    END IF;
    
    -- Add employee picture
    SET Pic_ID_UUID = JSON_UNQUOTE(JSON_EXTRACT(db_add_picture(p_pic_path), '$.data'));
    
    -- Insert employee into the employee table
    INSERT INTO employee (Employee_ID, NIC, Initials, First_Name, Last_Name, Date_of_Birth, Gender, Marital_Status, Phone, Email_Work, Email_private, Address, Pic_ID, Dept_ID, Title_ID, PayGrade_ID, Employment_Stat_ID, PF_Number) 
    VALUES (Employee_ID_UUID, p_NIC, p_initials, p_first_Name, p_last_Name, p_date_of_birth, p_gender, p_marital_status, p_phone, p_email_work, p_email_private, p_address, Pic_ID_UUID, 
    (SELECT Dept_ID FROM department WHERE department.Dept_ID = p_dept_id), 
    (SELECT Title_ID FROM job_title WHERE job_title.Title = p_title),
    (SELECT PayGrade_ID FROM pay_grade WHERE pay_grade.Pay_Grade_Level = p_paygrade),
    (SELECT Employment_Stat_ID FROM employment_status WHERE employment_status.Employment_Stat_Type = p_employment_stat),
    p_pf_number);

    -- Process dependents from JSON array
    SET _count = JSON_LENGTH(p_dependent_info);
    WHILE i < _count DO
        -- Add each dependent to the dependent_info table
        SET result_json = db_add_dependent(
            JSON_UNQUOTE(JSON_EXTRACT(p_dependent_info, CONCAT('$[', i, '].name'))), 
            Employee_ID_UUID,
            JSON_UNQUOTE(JSON_EXTRACT(p_dependent_info, CONCAT('$[', i, '].relationship')))
        );

        SET success_status = JSON_UNQUOTE(JSON_EXTRACT(result_json, '$.success'));
        IF NOT success_status THEN
			ROLLBACK; -- Manually roll back if this check fails
            SET _data = JSON_UNQUOTE(JSON_EXTRACT(result_json, '$.data'));
            SET result = JSON_OBJECT('success', success, 'data', _data);
            LEAVE add_employee_block;
        END IF;

        SET i = i + 1;
    END WHILE;

    -- Process emergency contacts from JSON array
    SET i = 0;
    SET _count = JSON_LENGTH(p_emergency_contacts_info);
    WHILE i < _count DO
        -- Add each contact to the contact_info table
        SET result_json = db_add_contact(
            Employee_ID_UUID, 
            JSON_UNQUOTE(JSON_EXTRACT(p_emergency_contacts_info, CONCAT('$[', i, '].first_Name'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_emergency_contacts_info, CONCAT('$[', i, '].last_Name'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_emergency_contacts_info, CONCAT('$[', i, '].phone'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_emergency_contacts_info, CONCAT('$[', i, '].email'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_emergency_contacts_info, CONCAT('$[', i, '].address'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_emergency_contacts_info, CONCAT('$[', i, '].relationship')))
        );

        SET success_status = JSON_UNQUOTE(JSON_EXTRACT(result_json, '$.success'));
        IF NOT success_status THEN
			ROLLBACK; -- Manually roll back if this check fails
            SET _data = JSON_UNQUOTE(JSON_EXTRACT(result_json, '$.data'));
            SET result = JSON_OBJECT('success', success, 'data', _data);
            LEAVE add_employee_block;
        END IF;

        SET i = i + 1;
    END WHILE;
    
    IF NOT (p_supervisor_NIC = "None" OR p_supervisor_NIC = "none" OR p_supervisor_NIC = "NULL" OR p_supervisor_NIC = "") THEN
		SET result_json = db_modify_supervisor(Employee_ID_UUID, (SELECT Employee_ID FROM employee WHERE employee.NIC = p_supervisor_NIC));
        SET success_status = JSON_UNQUOTE(JSON_EXTRACT(result_json, '$.success'));
        IF NOT success_status THEN
			ROLLBACK; -- Manually roll back if this check fails
            SET _data = JSON_UNQUOTE(JSON_EXTRACT(result_json, '$.data'));
            SET result = JSON_OBJECT('success', success, 'data', _data);
            LEAVE add_employee_block;
        END IF;
    END IF;
    

    -- Process custom fields from JSON
    IF NOT ((SELECT COUNT(*) FROM custom_field) = keys_count) THEN
		ROLLBACK;
		SET _data = 'Error : Custom fields array length mismatch.';
		SET result = JSON_OBJECT('success', success, 'data', _data);
		LEAVE add_employee_block;
	END IF;
    
	SET i = 0;

    -- Loop through each key in the JSON object
    WHILE i < keys_count DO
        -- Get the field name (key) from the JSON object
        SET field_name = JSON_UNQUOTE(JSON_EXTRACT(JSON_KEYS(p_custom_fields), CONCAT('$[', i, ']')));
        
        -- Check if the field already exists
		IF NOT EXISTS (SELECT 1 FROM custom_field WHERE custom_field.Field_Name = field_name) THEN
			ROLLBACK; -- Manually roll back if this check fails
			SET _data = 'Error : Custom fields mismatch. Not found';
			SET result = JSON_OBJECT('success', success, 'data', _data);
			LEAVE add_employee_block;
		END IF;
            
        -- Get the field value from the JSON object using the field name
        SET field_value = JSON_UNQUOTE(JSON_EXTRACT(p_custom_fields, CONCAT('$.', field_name)));

        -- Insert the field name and value into the table
        INSERT INTO employee_custom_field (Employee_ID, Field_ID, Data)
        VALUES (Employee_ID_UUID, (SELECT Field_ID FROM custom_field WHERE custom_field.Field_Name = field_name), field_value);

        -- Increment the loop counter
        SET i = i + 1;
    END WHILE;
    
    
    -- Add leave balance entry
	-- Create a JSON array with leave data
	SET tmp_leave_data = JSON_ARRAY(
		(SELECT Annual FROM pay_grade WHERE pay_grade.Pay_Grade_Level = p_paygrade), 
		(SELECT Casual FROM pay_grade WHERE pay_grade.Pay_Grade_Level = p_paygrade), 
		(SELECT Maternity FROM pay_grade WHERE pay_grade.Pay_Grade_Level = p_paygrade), 
		(SELECT No_Pay FROM pay_grade WHERE pay_grade.Pay_Grade_Level = p_paygrade)
	);

	-- Insert leave data into leave_data_balance table
	INSERT INTO leave_data_balance (
		Employee_ID, Year, Annual, Casual, Maternity, No_Pay, Total_Leave_Count
	)
	VALUES (
		Employee_ID_UUID, 
		Year(NOW()),  -- year is the current year
		JSON_UNQUOTE(JSON_EXTRACT(tmp_leave_data, '$[0]')),  -- Annual leave
		JSON_UNQUOTE(JSON_EXTRACT(tmp_leave_data, '$[1]')),  -- Casual leave
		JSON_UNQUOTE(JSON_EXTRACT(tmp_leave_data, '$[2]')),  -- Maternity leave
		JSON_UNQUOTE(JSON_EXTRACT(tmp_leave_data, '$[3]')),  -- No-Pay leave
		-- Calculate the total leave count
		JSON_UNQUOTE(JSON_EXTRACT(tmp_leave_data, '$[0]')) + 
		JSON_UNQUOTE(JSON_EXTRACT(tmp_leave_data, '$[1]')) + 
		JSON_UNQUOTE(JSON_EXTRACT(tmp_leave_data, '$[2]')) + 
		JSON_UNQUOTE(JSON_EXTRACT(tmp_leave_data, '$[3]'))
	);

    -- Final success return
    SET result = JSON_OBJECT('success', TRUE, 'data', 'Employee and related info added successfully');

    -- Commit the transaction
    COMMIT;

    END add_employee_block;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_user`(
    IN p_NIC VARCHAR(36),
    IN p_username VARCHAR(20),
    IN p_password VARCHAR(60),
    IN p_auth_level ENUM('Admin User', 'HR Manager', 'Employee', 'Second Manager'),
    OUT result JSON
)
    MODIFIES SQL DATA
BEGIN
    DECLARE _data VARCHAR(100) DEFAULT 'NULL';
    DECLARE success BOOLEAN DEFAULT FALSE;
    DECLARE User_ID_UUID CHAR(36);

    -- Exit handler to roll back the transaction and set result on error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SET result = JSON_OBJECT('success', FALSE, 'data', 'Error occurred during execution');
        ROLLBACK;
    END;

    -- Main block for adding the user
    add_user_block: BEGIN
        -- Start transaction
        START TRANSACTION;

        -- Generate UUID for new user
        SET User_ID_UUID = UUID();

        -- Check if the username already exists
        IF EXISTS (SELECT 1 FROM user WHERE User_Name = p_username) THEN
            ROLLBACK; -- Roll back the transaction if username exists
            SET _data = 'Error: Data duplicate. Username already exists';
            SET result = JSON_OBJECT('success', FALSE, 'data', _data);
            LEAVE add_user_block;
        END IF;

        -- Check if the provided NIC exists in the employee table
        IF NOT EXISTS (SELECT 1 FROM employee WHERE NIC = p_NIC) THEN
            ROLLBACK; -- Roll back if employee does not exist
            SET _data = 'Error: Employee not found';
            SET result = JSON_OBJECT('success', FALSE, 'data', _data);
            LEAVE add_user_block;
        END IF;
        
        -- Check if the provided NIC already has an account
        IF EXISTS (SELECT 1 FROM user WHERE Employee_ID = (SELECT Employee_ID FROM employee WHERE NIC = p_NIC)) THEN
            ROLLBACK; -- Roll back
            SET _data = 'Error: Employee already has an account';
            SET result = JSON_OBJECT('success', FALSE, 'data', _data);
            LEAVE add_user_block;
        END IF;

        -- Insert new user record
        INSERT INTO user (User_ID, User_Name, Password, Employee_ID, Auth_Level)
        VALUES (User_ID_UUID, p_username, p_password, 
                (SELECT Employee_ID FROM employee WHERE NIC = p_NIC), 
                p_auth_level);

        -- Set success result
        SET result = JSON_OBJECT('success', TRUE, 'data', 'User added successfully');

        -- Commit transaction
        COMMIT;
    END add_user_block;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `db_add_row_to_table` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `db_add_row_to_table`(
    IN p_table_name VARCHAR(255),
    IN p_row_data JSON,
    OUT result JSON
)
    MODIFIES SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE col_list TEXT DEFAULT '';
    DECLARE val_list TEXT DEFAULT '';
    DECLARE success BOOLEAN DEFAULT FALSE;
    DECLARE temp JSON DEFAULT NULL;
    DECLARE query TEXT;

    block: BEGIN
        -- Prepare column list and value list for insertion, handling NULL values
        SET col_list = (
            SELECT GROUP_CONCAT(CONCAT('`', column_name, '`'))
            FROM information_schema.columns
            WHERE table_schema = DATABASE()
            AND table_name = p_table_name
            AND JSON_EXTRACT(p_row_data, CONCAT('$.', column_name)) IS NOT NULL
        );

        SET val_list = (
            SELECT GROUP_CONCAT(
                CASE 
                    WHEN data_type IN ('int', 'decimal', 'float', 'double') 
                    THEN JSON_UNQUOTE(JSON_EXTRACT(p_row_data, CONCAT('$.', column_name)))
                    ELSE QUOTE(JSON_UNQUOTE(JSON_EXTRACT(p_row_data, CONCAT('$.', column_name))))
                END
            )
            FROM information_schema.columns
            WHERE table_schema = DATABASE()
            AND table_name = p_table_name
            AND JSON_EXTRACT(p_row_data, CONCAT('$.', column_name)) IS NOT NULL
        );

        -- If no valid columns, return failure
        IF col_list IS NULL OR val_list IS NULL THEN
            SET result = JSON_OBJECT('success', FALSE, 'message', 'No valid columns in JSON data');
            LEAVE block;
        END IF;

        -- Construct and execute the dynamic insert query
        SET @query = CONCAT('INSERT INTO `', p_table_name, '` (', col_list, ') VALUES (', val_list, ')');
        
        PREPARE stmt FROM @query;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;

        -- Set the result JSON
        SET result = JSON_OBJECT(
            'success', success,
            'data', 'Row added successfully'
        );

    END block;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `db_get_customfield_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `db_get_customfield_data`(
    IN p_field_id int,
    IN p_dept_id int,
    IN p_brach_id int,
    OUT result JSON
)
BEGIN
    DECLARE _data JSON;
    DECLARE success BOOLEAN DEFAULT FALSE;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of an error
        ROLLBACK;
        SET result = JSON_OBJECT('success', FALSE, 'data', 'An error occurred while fetching data from the database');
    END;

    -- Start the transaction
    START TRANSACTION;

    -- Fetch employee contact details using the given parameters
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            
            'Full_Name', CONCAT(e.Initials, ' ', e.First_Name, ' ', e.Last_Name),
            'NIC', e.NIC,
            'Field Name', ecf.Data
        )
    ) INTO _data
    FROM employee e
    LEFT JOIN employee_custom_field ecf ON e.Employee_ID = ecf.Employee_ID
    LEFT JOIN department de on e.Dept_ID = de.Dept_ID
    WHERE (p_field_id = 0 OR p_field_id = ecf.Field_ID)
    and (p_dept_id = 0 OR p_dept_id = de.Dept_ID)
    and (p_brach_id = 0 OR p_brach_id = de.Branch_ID);

    -- Check if data is fetched and set success accordingly
    SET success = (_data IS NOT NULL);

    -- Commit the transaction
    COMMIT;

    IF success THEN
        SET result = JSON_OBJECT('success', TRUE, 'data', _data);
    ELSE
        SET result = JSON_OBJECT('success', FALSE, 'data', 'No data found for the provided combination');
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `db_get_employee_details` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `db_get_employee_details`(  

    IN p_employee_ID CHAR(36),  

    OUT result JSON 

)
    READS SQL DATA
    DETERMINISTIC
BEGIN  

    DECLARE employee_data JSON DEFAULT NULL;  

    DECLARE dependant_data JSON DEFAULT NULL;  

    DECLARE supervisor_data JSON DEFAULT NULL;  

    DECLARE emergency_contact JSON DEFAULT NULL;  

    DECLARE temp JSON DEFAULT NULL;  

    DECLARE team_data JSON DEFAULT NULL;  

    DECLARE pic_data JSON DEFAULT NULL;  

    DECLARE data JSON DEFAULT NULL;  

    DECLARE success BOOLEAN DEFAULT FALSE;  

  

    IF EXISTS (SELECT * FROM employee WHERE Employee_ID = p_employee_ID) THEN  

        -- Fetch employee data  

        SELECT JSON_ARRAY(  

            JSON_OBJECT('Employee_ID', employee.Employee_ID),  

            JSON_OBJECT('NIC', employee.NIC),  

            JSON_OBJECT('Initials', employee.Initials),  

            JSON_OBJECT('First_Name', employee.First_Name),  

            JSON_OBJECT('Last_Name', employee.Last_Name),  

            JSON_OBJECT('Date_of_Birth', employee.Date_of_Birth),  

            JSON_OBJECT('Gender', employee.Gender),  

            JSON_OBJECT('Marital_Status', employee.Marital_Status),  

            JSON_OBJECT('Phone', employee.Phone),  

            JSON_OBJECT('Email_Work', employee.Email_Work),  

            JSON_OBJECT('Email_private', employee.Email_private),  

            JSON_OBJECT('Address', employee.Address),  

            JSON_OBJECT('Deptartment_Name', department.Dept_Name),  

            JSON_OBJECT('Branch_Name', branch.Branch_Name),  

            JSON_OBJECT('Title', job_title.Title),  

            JSON_OBJECT('Employment_Status', employment_status.Employment_Stat_Type)  

        ) INTO employee_data  

        FROM employee   

        INNER JOIN department ON employee.Dept_ID = department.Dept_ID  

        INNER JOIN branch ON department.Branch_ID = branch.Branch_ID   

        INNER JOIN job_title ON employee.Title_ID = job_title.Title_ID   

        INNER JOIN employment_status ON employee.Employment_Stat_ID = employment_status.Employment_Stat_ID  

        WHERE employee.Employee_ID = p_employee_ID;  

  

        -- Fetch dependant data if exists  

        SET temp = db_get_dependants(p_employee_ID);  

        IF JSON_UNQUOTE(JSON_EXTRACT(temp, '$.success')) = 1 THEN  

            SET dependant_data = JSON_UNQUOTE(JSON_EXTRACT(temp, '$.data'));  

        END IF; 

  

        -- Fetch supervisor data if exists  

        SET temp = db_get_superviser(p_employee_ID);  

        IF JSON_UNQUOTE(JSON_EXTRACT(temp, '$.success')) = 1 THEN  

            SET supervisor_data = JSON_UNQUOTE(JSON_EXTRACT(temp, '$.data'));  

        END IF; 

  

        -- Fetch team data if exists  

        SET temp = db_get_team(p_employee_ID);  

        IF JSON_UNQUOTE(JSON_EXTRACT(temp, '$.success')) = 1 THEN  

            SET team_data = JSON_UNQUOTE(JSON_EXTRACT(temp, '$.data'));  

        END IF; 

  

        -- Fetch emergency contact if exists  

        SET temp = db_get_emergency_contact(p_employee_ID);  

        IF JSON_UNQUOTE(JSON_EXTRACT(temp, '$.success')) = 1 THEN  

            SET emergency_contact = JSON_UNQUOTE(JSON_EXTRACT(temp, '$.data'));  

        END IF; 

  

        -- Fetch picture data if exists  

        SET temp = db_get_employee_pic(p_employee_ID);  

        IF JSON_UNQUOTE(JSON_EXTRACT(temp, '$.success')) = 1 THEN  

            SET pic_data = JSON_UNQUOTE(JSON_EXTRACT(temp, '$.data'));  

        END IF; 

  

        -- Combine all data into the data object  

        SET data = JSON_OBJECT(  

            'Employee_Data', employee_data,  

            'Dependant_Data', dependant_data,  

            'Supervisor_Data', supervisor_data,  

            'Pic_Data', pic_data,  

            'Team_Data', team_data,  

            'Emergency_Contacts', emergency_contact  

        );  

  

        -- Set success to true  

        SET success = TRUE;  

    ELSE  

        -- If employee doesn't exist  

        SET data = JSON_OBJECT('message', 'Employee does not exist');  

        SET success = FALSE;  

    END IF; 

    -- Set the final result as a JSON object  

    SET result = JSON_OBJECT(  

        'data', data,  

        'success', success  

    );  

  

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `db_get_organization_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `db_get_organization_data`(
    IN p_organization_id int,
    OUT result JSON
)
BEGIN
    DECLARE _data JSON;
    DECLARE success BOOLEAN DEFAULT FALSE;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of an error
        ROLLBACK;
        SET result = JSON_OBJECT('success', FALSE, 'data', 'An error occurred while fetching data from the database');
    END;

    -- Start the transaction
    START TRANSACTION;

    -- Fetch employee contact details using the given parameters
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'Organization Name', o.Organization_Name,
            'Registration No', o.Registration_No,
            'Head Office', o.HeadOffice,
            'Branch Name',b.Branch_Name
        )
    ) INTO _data
    FROM branch b
	JOIN organization o ON b.Organization_ID = o.Organization_ID
    WHERE (p_organization_id = 0 OR p_organization_id = o.Organization_ID)
    ;

    -- Check if data is fetched and set success accordingly
    SET success = (_data IS NOT NULL);

    -- Commit the transaction
    COMMIT;

    IF success THEN
        SET result = JSON_OBJECT('success', TRUE, 'data', _data);
    ELSE
        SET result = JSON_OBJECT('success', FALSE, 'data', 'No data found for the provided combination');
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteTableRow` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteTableRow`(
    IN p_table_name VARCHAR(255), 
    IN p_json JSON,
    OUT result JSON
)
    MODIFIES SQL DATA
BEGIN
    DECLARE table_exists INT DEFAULT 0;
    DECLARE _data VARCHAR(100) DEFAULT "NULL";
    DECLARE success BOOLEAN DEFAULT FALSE;

    -- **************************** --


    -- Start of the labeled block
    modify_data_block: BEGIN

        -- Start the transaction
        START TRANSACTION;

        -- Check if the table exists
        SELECT COUNT(*) INTO table_exists 
        FROM information_schema.tables 
        WHERE table_schema = 'hrms' AND table_name = p_table_name;

        IF table_exists = 0 THEN
            ROLLBACK; -- Roll back if the table doesn't exist
            SET result = JSON_OBJECT('success', FALSE, 'data', 'Error: No table found.');
            LEAVE modify_data_block;
        END IF;

			-- Deleting the 'branch' table
        IF p_table_name = 'branch' THEN
			IF EXISTS (SELECT 1 FROM branch WHERE branch.Branch_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Branch_ID'))) THEN
				DELETE FROM branch WHERE branch.Branch_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Branch_ID'));
			END IF;
		
        ELSEIF p_table_name = 'custom_field' THEN
            -- Deleting the 'custom_field' table
            IF EXISTS (SELECT 1 FROM custom_field WHERE custom_field.Field_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Field_ID'))) THEN
				DELETE FROM custom_field WHERE custom_field.Field_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Field_ID'));
			END IF;
		
		ELSEIF p_table_name = 'department' THEN
            -- Deleting the 'department' table
            IF EXISTS (SELECT 1 FROM department WHERE department.Dept_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Dept_ID'))) THEN
				DELETE FROM department WHERE department.Dept_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Dept_ID'));
			END IF;
		
		ELSEIF p_table_name = 'dependent_info' THEN
            -- Deleting the 'dependent_info' table
            IF EXISTS (SELECT 1 FROM dependent_info WHERE dependent_info.Name = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Name')) AND 
														  dependent_info.Employee_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Employee_ID'))) THEN
				DELETE FROM dependent_info WHERE dependent_info.Name = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Name')) AND 
												 dependent_info.Employee_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Employee_ID'));
			END IF;
		
		ELSEIF p_table_name = 'emergency_contact' THEN
            -- Deleting the 'emergency_contact' table
            IF EXISTS (SELECT 1 FROM emergency_contact WHERE emergency_contact.Contact_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Contact_ID'))) THEN
				DELETE FROM emergency_contact WHERE emergency_contact.Contact_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Contact_ID'));
			END IF;
		
		ELSEIF p_table_name = 'employee' THEN
            -- Deleting the 'employee' table
            IF EXISTS (SELECT 1 FROM employee WHERE employee.Employee_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Employee_ID'))) THEN
				DELETE FROM employee WHERE employee.Employee_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Employee_ID'));
			END IF;
		
		ELSEIF p_table_name = 'employee_custom_field' THEN
            -- Deleting the 'employee_custom_field' table
            IF EXISTS (SELECT 1 FROM employee_custom_field WHERE employee_custom_field.Field_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Field_ID')) AND 
																 employee_custom_field.Employee_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Employee_ID'))) THEN
				DELETE FROM employee_custom_field WHERE employee_custom_field.Field_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Field_ID')) AND 
														employee_custom_field.Employee_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Employee_ID'));
			END IF;
		
		ELSEIF p_table_name = 'employee_pic' THEN
            -- Deleting the 'employee_pic' table
            IF EXISTS (SELECT 1 FROM employee_pic WHERE employee_pic.Pic_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Pic_ID'))) THEN
				DELETE FROM employee_pic WHERE employee_pic.Pic_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Pic_ID'));
			END IF;
        
		ELSEIF p_table_name = 'employee_supervisor' THEN
            -- Deleting the 'employee_supervisor' table
            IF EXISTS (SELECT 1 FROM employee_supervisor WHERE employee_supervisor.Supervisor_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Supervisor_ID')) AND 
															   employee_supervisor.Employee_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Employee_ID'))) THEN
				DELETE FROM employee_supervisor WHERE employee_supervisor.Supervisor_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Supervisor_ID')) AND 
													  employee_supervisor.Employee_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Employee_ID'));
			END IF;
		
		ELSEIF p_table_name = 'employment_status' THEN
            -- Deleting the 'employment_status' table
            IF EXISTS (SELECT 1 FROM employment_status WHERE employment_status.Employment_Stat_Type = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Employment_Stat_Type'))) THEN
				DELETE FROM employment_status WHERE employment_status.Employment_Stat_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Employment_Stat_ID'));
			END IF;
		
		ELSEIF p_table_name = 'job_title' THEN
            -- Deleting the 'job_title' table
            IF EXISTS (SELECT 1 FROM job_title WHERE job_title.Title = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Title'))) THEN
				DELETE FROM job_title WHERE job_title.Title_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Title_ID'));
			END IF;
		
		ELSEIF p_table_name = 'leave_data_balance' THEN
            -- Deleting the 'leave_data_balance' table
            IF EXISTS (SELECT 1 FROM leave_data_balance WHERE leave_data_balance.Year = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Year')) AND 
															  leave_data_balance.Employee_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Employee_ID'))) THEN
				DELETE FROM leave_data_balance WHERE leave_data_balance.Year = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Year')) AND 
													 leave_data_balance.Employee_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Employee_ID'));
			END IF;
		
		ELSEIF p_table_name = 'leave_request' THEN
            -- Deleting the 'leave_request' table
            IF EXISTS (SELECT 1 FROM leave_request WHERE leave_request.Request_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Request_ID')) AND 
														 leave_request.User_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.User_ID'))) THEN
				DELETE FROM leave_request WHERE leave_request.Request_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Request_ID')) AND 
												leave_request.User_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.User_ID'));
			END IF;
        
		ELSEIF p_table_name = 'notification' THEN
            -- Deleting the 'notification' table
            IF EXISTS (SELECT 1 FROM notification WHERE notification.User_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.User_ID'))) THEN
				DELETE FROM notification WHERE notification.User_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.User_ID'));
			END IF;
                
		ELSEIF p_table_name = 'organization' THEN
            -- Deleting the 'organization' table
            IF EXISTS (SELECT 1 FROM organization WHERE organization.Organization_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Organization_ID'))) THEN
				DELETE FROM organization WHERE organization.Organization_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Organization_ID'));
			END IF;

		ELSEIF p_table_name = 'pay_grade' THEN
            -- Deleting the 'pay_grade' table
            IF EXISTS (SELECT 1 FROM pay_grade WHERE pay_grade.PayGrade_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.PayGrade_ID'))) THEN
				DELETE FROM pay_grade WHERE pay_grade.PayGrade_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.PayGrade_ID'));
			END IF;

		ELSEIF p_table_name = 'user' THEN
            -- Deleting the 'user' table
            IF EXISTS (SELECT 1 FROM user WHERE user.User_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.User_ID')) AND
												user.User_Name = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.User_Name')) AND
												user.Employee_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Employee_ID'))) THEN
				DELETE FROM user WHERE user.User_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.User_ID')) AND
									   user.User_Name = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.User_Name')) AND 
									   user.Employee_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Employee_ID'));
			END IF;
        END IF;

        -- Check if any rows were affected
        IF ROW_COUNT() = 0 THEN
            ROLLBACK; -- Roll back if no rows were updated
            SET result = JSON_OBJECT('success', FALSE, 'data', 'Warning: No data were updated.');
            LEAVE modify_data_block;
        END IF;

        -- Final success return
        SET result = JSON_OBJECT('success', TRUE, 'data', 'Update success.');

        -- Commit the transaction
        COMMIT;

    END modify_data_block;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_employee` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_employee`(
    IN p_nic VARCHAR(36),
    OUT result JSON
)
    MODIFIES SQL DATA
BEGIN
    DECLARE _data VARCHAR(100) DEFAULT "NULL";
    DECLARE success BOOLEAN DEFAULT FALSE;
    DECLARE Employee_ID_UUID CHAR(36);
    DECLARE delete_user_result JSON;  -- Temporary variable for delete_user result
    
    -- Labeled block to handle exits properly
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- In case of exception, roll back the transaction and set result
        ROLLBACK;
        SET result = JSON_OBJECT('success', FALSE, 'data', 'Error occurred during execution');
    END;
    
    -- Start of the labeled block
    delete_employee_block: BEGIN
    
        -- Start transaction
        START TRANSACTION;
        
        -- Check if employee exists
        IF NOT EXISTS (SELECT 1 FROM employee WHERE employee.NIC = p_nic) THEN
            ROLLBACK;  -- Roll back if this check fails
            SET _data = 'Error: Employee not found';
            SET result = JSON_OBJECT('success', FALSE, 'data', _data);
            LEAVE delete_employee_block;
        END IF;
        
        -- Get Employee ID based on NIC
        SELECT Employee_ID INTO Employee_ID_UUID FROM employee WHERE employee.NIC = p_nic;
        
        -- Delete associated user account if exists
        IF EXISTS (SELECT 1 FROM user WHERE user.Employee_ID = Employee_ID_UUID) THEN
            CALL delete_user((SELECT User_ID FROM user WHERE user.Employee_ID = Employee_ID_UUID), delete_user_result);
        END IF;
        
        -- Delete remaining data associated with the employee
        IF EXISTS (SELECT 1 FROM dependent_info WHERE dependent_info.Employee_ID = Employee_ID_UUID) THEN
            DELETE FROM dependent_info WHERE dependent_info.Employee_ID = Employee_ID_UUID;
        END IF;
        IF EXISTS (SELECT 1 FROM emergency_contact WHERE emergency_contact.Employee_ID = Employee_ID_UUID) THEN
            DELETE FROM emergency_contact WHERE emergency_contact.Employee_ID = Employee_ID_UUID;
        END IF;
        IF EXISTS (SELECT 1 FROM employee_custom_field WHERE employee_custom_field.Employee_ID = Employee_ID_UUID) THEN
            DELETE FROM employee_custom_field WHERE employee_custom_field.Employee_ID = Employee_ID_UUID;
        END IF;
        IF EXISTS (SELECT 1 FROM employee_supervisor WHERE employee_supervisor.Employee_ID = Employee_ID_UUID) THEN
            DELETE FROM employee_supervisor WHERE employee_supervisor.Employee_ID = Employee_ID_UUID;
        END IF;
        IF EXISTS (SELECT 1 FROM leave_data_balance WHERE leave_data_balance.Employee_ID = Employee_ID_UUID) THEN
            DELETE FROM leave_data_balance WHERE leave_data_balance.Employee_ID = Employee_ID_UUID;
        END IF;
        
        -- Check if the employee is a supervisor
        IF EXISTS (SELECT 1 FROM employee_supervisor WHERE employee_supervisor.Supervisor_ID = Employee_ID_UUID) THEN
            ROLLBACK;
            SET _data = 'Error: Cannot remove employee. Employee is a supervisor. Please contact admin';
            SET result = JSON_OBJECT('success', FALSE, 'data', _data);
            LEAVE delete_employee_block;
        END IF;
        
        -- Delete employee record
        DELETE FROM employee WHERE employee.NIC = p_nic;
        
        -- Set the final success result
        SET result = JSON_OBJECT('success', TRUE, 'data', 'Employee deleted successfully');
        
        -- Commit the transaction
        COMMIT;

    END delete_employee_block;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_user`(
    IN p_user_id VARCHAR(36),
    OUT result JSON
)
    MODIFIES SQL DATA
BEGIN
    DECLARE _data VARCHAR(100) DEFAULT "NULL";
    DECLARE success BOOLEAN DEFAULT FALSE;
    
    -- Labeled block to handle exits properly
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- In case of exception, roll back the transaction and set result
        ROLLBACK;
        SET result = JSON_OBJECT('success', FALSE, 'data', 'Error occurred during execution');
    END;

    -- Start of the labeled block
    delete_user_block: BEGIN

        -- Start transaction
        START TRANSACTION;
        
        -- Check for leftover data
        IF EXISTS (SELECT 1 FROM notification WHERE notification.User_ID = p_user_id) THEN
            DELETE FROM notification WHERE (notification.User_ID = p_user_id);
        END IF;
        IF EXISTS (SELECT 1 FROM leave_request WHERE leave_request.User_ID = p_user_id) THEN
            DELETE FROM leave_request WHERE (leave_request.User_ID = p_user_id);
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM user WHERE user.User_ID = p_user_id) THEN
            ROLLBACK; -- Manually roll back if this check fails
            SET _data = 'Error : User not found';
            SET result = JSON_OBJECT('success', false, 'data', _data);
            LEAVE delete_user_block;
        END IF;
        
        -- Delete User
        DELETE FROM user WHERE (user.User_ID = p_user_id);
        
        -- Final success return
        SET result = JSON_OBJECT('success', TRUE, 'data', 'User deleted successfully');

        -- Commit the transaction
        COMMIT;

    END delete_user_block;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetTableData` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetTableData`(
IN p_table_name VARCHAR(255))
BEGIN
    SET @query = CONCAT('SELECT * FROM ', p_table_name);
    PREPARE stmt FROM @query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_annual_leave_balance_report` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_annual_leave_balance_report`(
    IN p_dept_id INT,
    IN p_branch_id INT,
    OUT result JSON
)
BEGIN
    DECLARE _data JSON;
    DECLARE success BOOLEAN DEFAULT FALSE;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of an error
        ROLLBACK;
        SET result = JSON_OBJECT('success', FALSE, 'data', 'An error occurred while fetching data from the database');
    END;

    -- Start the transaction
    START TRANSACTION;

    -- Fetch employee leave balance details
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'Employee_ID', e.Employee_ID,
            'Full_Name', CONCAT(e.Initials, ' ', e.First_Name, ' ', e.Last_Name),
            'Employment_Status', es.Employment_Stat_Type,
            'Pay_Grade_Level', pg.Pay_Grade_Level,

            'Annual_Leave_Balance', lb.Annual,
            'Annual_Leave_Entitlement', pg.Annual,
            'Annual_Leave_Taken', (pg.Annual - lb.Annual),

            'Casual_Leave_Balance', lb.Casual,
            'Casual_Leave_Entitlement', pg.Casual,
            'Casual_Leave_Taken', (pg.Casual - lb.Casual),

            'Maternity_Leave_Balance', lb.Maternity,
            'Maternity_Leave_Entitlement', pg.Maternity,
            'Maternity_Leave_Taken', (pg.Maternity - lb.Maternity),

            'No_Pay_Leave_Balance', lb.No_Pay,
            'No_Pay_Leave_Entitlement', pg.No_Pay,
            'No_Pay_Leave_Taken', (pg.No_Pay - lb.No_Pay),

            'Total_Leave_Balance', (lb.Annual + lb.Casual + lb.Maternity + lb.No_Pay),
            'Total_Leave_Entitlement', (pg.Annual + pg.Casual + pg.Maternity + pg.No_Pay),
            'Total_Leave_Taken', ((pg.Annual - lb.Annual) + (pg.Casual - lb.Casual) + (pg.Maternity - lb.Maternity) + (pg.No_Pay - lb.No_Pay))
        )
    ) INTO _data
    FROM 
        employee e
    LEFT JOIN department d ON e.Dept_ID = d.Dept_ID
    LEFT JOIN branch b ON d.Branch_ID = b.Branch_ID
    LEFT JOIN organization o ON b.Organization_ID = o.Organization_ID
    LEFT JOIN leave_data_balance lb ON e.Employee_ID = lb.Employee_ID
    LEFT JOIN pay_grade pg ON e.PayGrade_ID = pg.PayGrade_ID
    LEFT JOIN employment_status es ON e.Employment_Stat_ID = es.Employment_Stat_ID
    WHERE 
        (p_branch_id = 0 OR b.Branch_ID = p_branch_id) AND
        (p_dept_id = 0 OR d.Dept_ID = p_dept_id)
    ORDER BY 
        e.Employee_ID;

    -- Check if data is fetched and set success accordingly
    SET success = (_data IS NOT NULL AND JSON_LENGTH(_data) > 0);

    -- Commit the transaction
    COMMIT;

    -- Return the success status and data as JSON
    IF success THEN
        SET result = JSON_OBJECT('success', TRUE, 'data', _data);
    ELSE
        SET result = JSON_OBJECT('success', FALSE, 'data', 'No data found for the provided combination');
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_approve_leave_request_report` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_approve_leave_request_report`(
    IN p_dept_id INT,
    IN p_branch_id INT,
    IN p_start_date DATE,
    IN p_end_date DATE,
    OUT result JSON
)
BEGIN
    DECLARE _data JSON;
    DECLARE success BOOLEAN DEFAULT FALSE;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of an error
        ROLLBACK;
        SET result = JSON_OBJECT('success', FALSE, 'data', NULL);
    END;

    -- Start the transaction
    START TRANSACTION;

    -- Fetch and format the leave request report data using the view
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'Full_Name', Full_Name,
            'Employment_NIC', Employment_NIC,
            'Title', Title,
            'Pay_Grade_Level', Pay_Grade_Level,
            'Start_Date', Start_Date,
            'End_Date', End_Date,
            'Reason', Reason,
            'Supervisor_Full_Name', Supervisor_Full_Name,
            'Supervisor_NIC', Supervisor_NIC,
            'Supervisor_Title', Supervisor_Title
        )
    ) INTO _data
    FROM leave_requests_view AS rlrv
    WHERE rlrv.Request_Status = 'Approve' 
	  AND(p_branch_id = 0 OR Branch_ID = p_branch_id) 
      AND (p_dept_id = 0 OR Dept_ID = p_dept_id) 
      AND (Start_Date >= p_start_date AND End_Date <= p_end_date);

    -- Check if data is fetched and set success accordingly
    IF _data IS NOT NULL THEN
        SET success = TRUE;
    END IF;

    -- Commit the transaction
    COMMIT;
    IF success THEN
    	SET result = JSON_OBJECT('success', success, 'data', _data);
    ELSE
        SET result = JSON_OBJECT('success', FALSE, 'data', 'No data found for the provided combination');
    END IF;

    -- Return the success status and data as JSON
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_employees_by_pay_grade` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_employees_by_pay_grade`(
    IN p_dept_id INT,
    IN p_branch_id INT,
    IN p_pay_grade_id INT,
    OUT result JSON
)
BEGIN
    DECLARE _data JSON;
    DECLARE success BOOLEAN DEFAULT FALSE;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of an error
        ROLLBACK;
        SET result = JSON_OBJECT('success', FALSE, 'data', NULL);
    END;

    -- Start the transaction
    START TRANSACTION;

    -- Fetch employee details by pay grade from the view
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'NIC', ed.NIC,
            'Full_Name', ed.Full_Name,
            'Pay_Grade', ed.Pay_Grade_Level,
            'Dept_Name', ed.Dept_Name,
            'Branch_Name', ed.Branch_Name
        )
    ) INTO _data
    FROM employee_details_view ed
    WHERE (p_branch_id = 0 OR ed.Branch_ID = p_branch_id)
      AND (p_dept_id = 0 OR ed.Dept_ID = p_dept_id)
      AND (p_pay_grade_id = 0 OR ed.PayGrade_ID = p_pay_grade_id);

    -- Check if data is fetched and set success accordingly
    SET success = (_data IS NOT NULL);

    -- Commit the transaction
    COMMIT;

    -- Return the success status and data as JSON
    IF success THEN
        SET result = JSON_OBJECT('success', TRUE, 'data', _data);
    ELSE
        SET result = JSON_OBJECT('success', FALSE, 'data', 'No data found for the provided combination');
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_employees_by_title` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_employees_by_title`(
    IN p_dept_id INT,
    IN p_branch_id INT,
    IN p_title_id INT,
    OUT result JSON
)
BEGIN
    DECLARE _data JSON;
    DECLARE success BOOLEAN DEFAULT FALSE;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of an error
        ROLLBACK;
        SET result = JSON_OBJECT('success', FALSE, 'data', 'An error occurred while fetching data from the database');
    END;

    -- Start the transaction
    START TRANSACTION;

    -- Fetch employee details by job title from the view
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'NIC', NIC,
            'Full_Name', Full_Name,
            'Job_Title', Title,
            'Dept_Name', Dept_Name,
            'Branch_Name', Branch_Name
        )
    ) INTO _data
    FROM employee_details_view
    WHERE (p_branch_id = 0 OR Branch_ID = p_branch_id)
      AND (p_dept_id = 0 OR Dept_ID = p_dept_id)
	  AND (p_title_id = 0 OR Title_ID = p_title_id);

    -- Check if data is fetched and set success accordingly
    SET success = (_data IS NOT NULL);

    -- Commit the transaction
    COMMIT;

  IF success THEN
        SET result = JSON_OBJECT('success', TRUE, 'data', _data);
    ELSE
        SET result = JSON_OBJECT('success', FALSE, 'data', 'No data found for the provided combination');
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_employee_details` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_employee_details`(
    IN p_nic VARCHAR(12),
    IN p_name VARCHAR(60),
    OUT result JSON
)
BEGIN
    DECLARE _data JSON;
    DECLARE success BOOLEAN DEFAULT FALSE;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of an error
        ROLLBACK;
        SET result = JSON_OBJECT('success', FALSE, 'error', 'An error occurred while fetching the employee details.', 'data', NULL);
    END;

    -- Start the transaction
    START TRANSACTION;

    -- Fetch employee details using the given parameters
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'Full_Name', CONCAT(e.Initials, ' ', e.First_Name, ' ', e.Last_Name),
            'NIC', e.NIC,
            'Gender', e.Gender,
            'Email_Work', e.Email_Work,
            'Email_Private', e.Email_Private,
            'Phone', e.Phone,
            'Address', e.Address,
            'Department', d.Dept_Name,
            'Branch', b.Branch_Name,
            'Organization', o.Organization_Name,
            'Job_Title', jt.Title,
            'Pay_Grade', pg.Pay_Grade_Level,
            'Employment_Status', es.Employment_Stat_Type,
            'Dependents', (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'Dependent_Name', di.Name,
                        'Relationship', di.Relationship
                    )
                )
                FROM dependent_info di
                WHERE di.Employee_ID = e.Employee_ID
            ),
            'Emergency_Contact', (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'Contact_Name', CONCAT(ec.First_name, ' ', ec.Last_Name),
                        'Relationship', ec.Relationship,
                        'Phone', ec.Phone,
                        'Email', ec.Email,
                        'Address', ec.Address
                    )
                )
                FROM emergency_contact ec
                WHERE ec.Employee_ID = e.Employee_ID
            )
        )
    ) INTO _data
    FROM 
        employee e
    LEFT JOIN department d ON e.Dept_ID = d.Dept_ID
    LEFT JOIN branch b ON d.Branch_ID = b.Branch_ID
    LEFT JOIN organization o ON b.Organization_ID = o.Organization_ID
    LEFT JOIN job_title jt ON e.Title_ID = jt.Title_ID
    LEFT JOIN pay_grade pg ON e.PayGrade_ID = pg.PayGrade_ID
    LEFT JOIN employment_status es ON e.Employment_Stat_ID = es.Employment_Stat_ID
    WHERE (p_name = '' OR CONCAT(e.Initials, ' ', e.First_Name, ' ', e.Last_Name) LIKE CONCAT('%', p_name, '%'))
      AND (p_nic = '' OR e.NIC = p_nic);

    -- Check if data is fetched and set success accordingly
    IF JSON_LENGTH(_data) > 0 THEN
        SET success = TRUE;
    ELSE
        SET _data = JSON_OBJECT('message', 'employee not found in the database');
    END IF;

    -- Commit the transaction
    COMMIT;

    -- Return the success status and data as JSON
    SET result = JSON_OBJECT('success', success, 'data', _data);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_employee_detail_by_branch` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_employee_detail_by_branch`(
    IN p_branch_id INT,
    IN p_status_id INT,
    IN p_title_id INT,
    OUT result JSON
)
BEGIN
    DECLARE _data JSON;
    DECLARE success BOOLEAN DEFAULT FALSE;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of an error
        ROLLBACK;
        SET result = JSON_OBJECT('success', FALSE, 'data', NULL);
    END;

    -- Start the transaction
    START TRANSACTION;

    -- Fetch employee details from the view
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            
            'Full_Name', Full_Name,
            'Employment_NIC', NIC,
            'Photo_Path', Photo_Path,
            'Dept_Name', Dept_Name,
            'Branch_Name', Branch_Name,
            'Status', Status,
            'Title', Title
        )
    ) INTO _data
    FROM employee_details_view ed
    WHERE (p_branch_id = 0 OR ed.Branch_ID = p_branch_id)
      AND (p_status_id = 0 OR ed.Employment_Stat_ID = p_status_id)
      AND (p_title_id = 0 OR ed.Title_ID = p_title_id);

    IF JSON_LENGTH(_data) > 0 THEN
        SET success = TRUE;
    ELSE
        SET _data = JSON_OBJECT('message', 'No relevant combination in database');
    END IF;

    -- Commit the transaction
    COMMIT;
    -- Return the success status and data as JSON
    SET result = JSON_OBJECT('success', success, 'data', _data);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_employee_detail_by_department` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_employee_detail_by_department`(
    IN p_dep_id INT,
    IN p_status_id INT,
    IN p_title_id INT,
    OUT result JSON
)
BEGIN
    DECLARE _data JSON;
    DECLARE success BOOLEAN DEFAULT FALSE;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of an error
        ROLLBACK;
        SET result = JSON_OBJECT('success', FALSE, 'data', NULL);
    END;

    -- Start the transaction
    START TRANSACTION;

    -- Fetch employee details from the view
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'Full_Name', ed.Full_Name,
            'NIC', ed.NIC,
            'Photo_Path', ed.Photo_Path,
            'Dept_Name', ed.Dept_Name,
            'Branch_Name', ed.Branch_Name,
            'Status', ed.Status,
            'Title', ed.Title
        )
    ) INTO _data
    FROM employee_details_view AS ed
    WHERE (p_dep_id = 0 OR ed.Dept_ID = p_dep_id)
      AND (p_status_id = 0 OR ed.Employment_Stat_ID = p_status_id)
      AND (p_title_id = 0 OR ed.Title_ID = p_title_id);

    -- Check if data is fetched and set success accordingly
    IF JSON_LENGTH(_data) > 0 THEN
        SET success = TRUE;
    ELSE
        SET _data = JSON_OBJECT('message', 'No relevant combination in database');
    END IF;

    -- Commit the transaction
    COMMIT;

    -- Return the success status and data as JSON
    SET result = JSON_OBJECT('success', success, 'data', _data);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_pending_leave_request_report` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_pending_leave_request_report`(
    IN p_dept_id INT,
    IN p_branch_id INT,
    IN p_start_date DATE,
    IN p_end_date DATE,
    OUT result JSON
)
BEGIN
    DECLARE _data JSON;
    DECLARE success BOOLEAN DEFAULT FALSE;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of an error
        ROLLBACK;
        SET result = JSON_OBJECT('success', FALSE, 'data', NULL);
    END;

    -- Start the transaction
    START TRANSACTION;

    -- Fetch and format the leave request report data using the view
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'Full_Name', Full_Name,
            'Employment_NIC', Employment_NIC,
            'Title', Title,
            'Pay_Grade_Level', Pay_Grade_Level,
            'Start_Date', Start_Date,
            'End_Date', End_Date,
            'Reason', Reason,
            'Supervisor_Full_Name', Supervisor_Full_Name,
            'Supervisor_NIC', Supervisor_NIC,
            'Supervisor_Title', Supervisor_Title
        )
    ) INTO _data
    FROM leave_requests_view AS lrv
    WHERE lrv.Request_Status = 'Pending' 
      AND (p_branch_id = 0 OR lrv.Branch_ID = p_branch_id)
      AND (p_dept_id = 0 OR lrv.Dept_ID = p_dept_id)
      AND (lrv.Start_Date >= p_start_date AND lrv.End_Date <= p_end_date);

    -- Check if data is fetched and set success accordingly
    IF JSON_LENGTH(_data) > 0 THEN
        SET success = TRUE;
    ELSE
        SET _data = JSON_OBJECT('message', 'No relevant combination in database');
    END IF;

    -- Commit the transaction
    COMMIT;

    -- Return the success status and data as JSON
    SET result = JSON_OBJECT('success', success, 'data', _data);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_reject_leave_request_report` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_reject_leave_request_report`(
    IN p_dept_id INT,
    IN p_branch_id INT,
    IN p_start_date DATE,
    IN p_end_date DATE,
    OUT result JSON
)
BEGIN
    DECLARE _data JSON;
    DECLARE success BOOLEAN DEFAULT FALSE;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of an error
        ROLLBACK;
        SET result = JSON_OBJECT('success', FALSE, 'data', NULL);
    END;

    -- Start the transaction
    START TRANSACTION;

    -- Fetch and format the leave request report data using the view
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'Full_Name', Full_Name,
            'Employment_NIC', Employment_NIC,
            'Title', Title,
            'Pay_Grade_Level', Pay_Grade_Level,
            'Start_Date', Start_Date,
            'End_Date', End_Date,
            'Reason', Reason,
            'Supervisor_Full_Name', Supervisor_Full_Name,
            'Supervisor_NIC', Supervisor_NIC,
            'Supervisor_Title', Supervisor_Title
        )
    ) INTO _data
    FROM leave_requests_view AS rlrv
    WHERE rlrv.Request_Status = 'Reject'  -- Ensure we're checking for 'Reject'
	  AND(p_branch_id = 0 OR Branch_ID = p_branch_id) 
      AND (p_dept_id = 0 OR Dept_ID = p_dept_id) 
      AND (Start_Date >= p_start_date AND End_Date <= p_end_date);

    -- Check if data is fetched and set success accordingly
   IF JSON_LENGTH(_data) > 0 THEN
        SET success = TRUE;
    ELSE
        SET _data = JSON_OBJECT('message', 'No relevant combination in database');
    END IF;

    -- Commit the transaction
    COMMIT;

    -- Return the success status and data as JSON
    SET result = JSON_OBJECT('success', success, 'data', _data);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `set_Pending_Leave_Requests_to_approve` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `set_Pending_Leave_Requests_to_approve`(
    IN p_req_id CHAR(36)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;
    START TRANSACTION;
    SET SQL_SAFE_UPDATES = 0;
    UPDATE leave_request
    SET Status = 'Approve'
    WHERE Request_ID = p_req_id AND Status = 'Pending';
    SET SQL_SAFE_UPDATES = 1;
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `set_Pending_Leave_Requests_to_reject` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `set_Pending_Leave_Requests_to_reject`(
    IN p_req_id CHAR(36)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;
    START TRANSACTION;
    SET SQL_SAFE_UPDATES = 0;
    UPDATE leave_request
    SET Status = 'Reject'
    WHERE Request_ID = p_req_id AND Status = 'Pending';
    SET SQL_SAFE_UPDATES = 1;
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateTableRow` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateTableRow`(
    IN p_table_name VARCHAR(255), 
    IN p_json JSON,
    OUT result JSON
)
    MODIFIES SQL DATA
BEGIN
    DECLARE table_exists INT DEFAULT 0;
    DECLARE _data VARCHAR(100) DEFAULT "NULL";
    DECLARE success BOOLEAN DEFAULT FALSE;

    -- **************************** --


    -- Start of the labeled block
    modify_data_block: BEGIN

        -- Start the transaction
        START TRANSACTION;

        -- Check if the table exists
        SELECT COUNT(*) INTO table_exists 
        FROM information_schema.tables 
        WHERE table_schema = 'hrms' AND table_name = p_table_name;

        IF table_exists = 0 THEN
            ROLLBACK; -- Roll back if the table doesn't exist
            SET result = JSON_OBJECT('success', FALSE, 'data', 'Error: No table found.');
            LEAVE modify_data_block;
        END IF;

        -- Updating the 'branch' table
        IF p_table_name = 'branch' THEN
            UPDATE branch
            SET 
                Branch_Name = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Branch_Name')),
                Address = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Address')),
                Country = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Country')),
                Organization_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Organization_ID'))
            WHERE 
                Branch_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Branch_ID'));

        ELSEIF p_table_name = 'custom_field' THEN
            -- Updating the 'custom_field' table
            UPDATE custom_field
            SET 
                Field_Name = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Field_Name'))
            WHERE 
                Field_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Field_ID'));
                
		ELSEIF p_table_name = 'department' THEN
            -- Updating the 'department' table
            UPDATE department
            SET 
                Dept_Name = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Dept_Name')),
                Branch_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Branch_ID'))
            WHERE 
                Dept_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Dept_ID'));
                
		ELSEIF p_table_name = 'dependent_info' THEN
            -- Updating the 'dependent_info' table
            UPDATE dependent_info
            SET 
                `Name` = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Name')),
                Relationship = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Relationship'))
            WHERE 
                Employee_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Employee_ID')) AND `Name` = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Name'));                

		ELSEIF p_table_name = 'emergency_contact' THEN
            -- Updating the 'emergency_contact' table
            UPDATE emergency_contact
            SET 
                First_Name = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.First_Name')),
                Last_Name = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Last_Name')),
                Phone = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Phone')),
                Email = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Email')),
                Address = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Address')),
                Relationship = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Relationship'))
            WHERE 
                Employee_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Employee_ID')) AND Contact_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Contact_ID'));                

		ELSEIF p_table_name = 'employee' THEN
            -- Updating the 'employee' table
            UPDATE employee
            SET 
                Initials = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Initials')),
                First_Name = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.First_Name')),
                Last_Name = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Last_Name')),
                Date_of_Birth = DATE(REPLACE(REPLACE(JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Date_of_Birth')), 'T', ' '), 'Z', '')),
                
                Gender = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Gender')),
                Marital_Status = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Marital_Status')),
                Phone = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Phone')),
                Email_Work = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Email_Work')),
                
                Email_private = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Email_private')),
                Address = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Address')),
                Pic_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Pic_ID')),
                Dept_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Dept_ID')),
                
                Title_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Title_ID')),
                PayGrade_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.PayGrade_ID')),
                Employment_Stat_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Employment_Stat_ID')),
                PF_Number = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.PF_Number'))
            WHERE 
                Employee_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Employee_ID')) AND NIC = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.NIC')); 

		ELSEIF p_table_name = 'employee_custom_field' THEN
            -- Updating the 'employee_custom_field' table
            UPDATE employee_custom_field
            SET 
                Field_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Field_ID')),
                `Data` = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Data'))
            WHERE 
                Employee_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Employee_ID')) AND Field_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Field_ID')); 
        
		ELSEIF p_table_name = 'employee_pic' THEN
            -- Updating the 'employee_pic' table
            UPDATE employee_pic
            SET 
                `Path` = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Path'))
            WHERE 
                Pic_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Pic_ID'));        
        
		ELSEIF p_table_name = 'employee_supervisor' THEN
            -- Updating the 'employee_supervisor' table
            UPDATE employee_supervisor
            SET 
                Supervisor_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Supervisor_ID')),
                Employee_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Employee_ID'))
            WHERE 
                Employee_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Employee_ID')) AND 
                Supervisor_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Supervisor_ID'));       
        
		ELSEIF p_table_name = 'employment_status' THEN
            -- Updating the 'employment_status' table
            UPDATE employment_status
            SET 
                Employment_Stat_Type = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Employment_Stat_Type'))
            WHERE 
                Employment_Stat_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Employment_Stat_ID'));       
        
		ELSEIF p_table_name = 'job_title' THEN
            -- Updating the 'job_title' table
            UPDATE job_title
            SET 
                Title = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Title'))
            WHERE 
                Title_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Title_ID'));       
        
		ELSEIF p_table_name = 'leave_data_balance' THEN
            -- Updating the 'leave_data_balance' table
            UPDATE leave_data_balance
            SET
                `Year` = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Year')),
                Annual = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Annual')),
                Casual = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Casual')),
                Maternity = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Maternity')),
                No_Pay = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.No_Pay')),
                Total_Leave_Count = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Total_Leave_Count'))
            WHERE
                Employee_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Employee_ID'));         
        
		ELSEIF p_table_name = 'leave_request' THEN
            -- Updating the 'leave_request' table
            UPDATE leave_request
            SET 
                Leave_Type = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Leave_Type')),
                Start_Date = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Start_Date')),
                End_Date = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.End_Date')),
                Reason = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Reason')),
                `Status` = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Status'))
            WHERE 
                Request_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Request_ID')) AND User_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.User_ID'));         
        
		ELSEIF p_table_name = 'notification' THEN
            -- Updating the 'notification' table
            UPDATE notification
            SET 
                `Data` = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Data')),
                `DateTime` = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.DateTime')),
                `Status` = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Status'))
            WHERE 
                User_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.User_ID'));         
                
		ELSEIF p_table_name = 'organization' THEN
            -- Updating the 'organization' table
            UPDATE organization
            SET 
                Organization_Name = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Organization_Name')),
                Registration_No = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Registration_No')),
                HeadOffice = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.HeadOffice'))
            WHERE 
                Organization_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Organization_ID'));       

		ELSEIF p_table_name = 'pay_grade' THEN
            -- Updating the 'pay_grade' table
            UPDATE pay_grade
            SET 
                Pay_Grade_Level = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Pay_Grade_Level')),
                Annual = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Annual')),
                Casual = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Casual')),
                Maternity = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Maternity')),
                `No-Pay` = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.No-Pay'))
            WHERE 
                PayGrade_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.PayGrade_ID'));       

		ELSEIF p_table_name = 'user' THEN
            -- Updating the 'user' table
            UPDATE user
            SET 
                User_Name = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.User_Name')),
                `Password` = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Password')),
                Employee_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Employee_ID')),
                Auth_Level = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.Auth_Level'))
            WHERE 
                User_ID = JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.User_ID'));        

        END IF;

        -- Check if any rows were affected
        IF ROW_COUNT() = 0 THEN
            ROLLBACK; -- Roll back if no rows were updated
            SET result = JSON_OBJECT('success', FALSE, 'data', 'Warning: No data were updated.');
            LEAVE modify_data_block;
        END IF;

        -- Final success return
        SET result = JSON_OBJECT('success', TRUE, 'data', 'Update success.');

        -- Commit the transaction
        COMMIT;

    END modify_data_block;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `employee_details_view`
--

/*!50001 DROP VIEW IF EXISTS `employee_details_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `employee_details_view` AS select concat(`e`.`Initials`,' ',`e`.`First_Name`,' ',`e`.`Last_Name`) AS `Full_Name`,`e`.`NIC` AS `NIC`,`ep`.`Path` AS `Photo_Path`,`d`.`Dept_Name` AS `Dept_Name`,`b`.`Branch_Name` AS `Branch_Name`,`es`.`Employment_Stat_Type` AS `Status`,`jt`.`Title` AS `Title`,`pg`.`Pay_Grade_Level` AS `Pay_Grade_Level`,`b`.`Branch_ID` AS `Branch_ID`,`d`.`Dept_ID` AS `Dept_ID`,`e`.`Title_ID` AS `Title_id`,`e`.`Employment_Stat_ID` AS `Employment_Stat_ID`,`e`.`PayGrade_ID` AS `PayGrade_ID`,`o`.`Organization_ID` AS `Organization_ID` from (((((((`employee` `e` join `employee_pic` `ep` on((`e`.`Pic_ID` = `ep`.`Pic_ID`))) join `department` `d` on((`e`.`Dept_ID` = `d`.`Dept_ID`))) join `branch` `b` on((`d`.`Branch_ID` = `b`.`Branch_ID`))) join `organization` `o` on((`b`.`Organization_ID` = `o`.`Organization_ID`))) join `employment_status` `es` on((`e`.`Employment_Stat_ID` = `es`.`Employment_Stat_ID`))) join `job_title` `jt` on((`e`.`Title_ID` = `jt`.`Title_ID`))) join `pay_grade` `pg` on((`pg`.`PayGrade_ID` = `e`.`PayGrade_ID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `leave_requests_view`
--

/*!50001 DROP VIEW IF EXISTS `leave_requests_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `leave_requests_view` AS select concat(`e`.`Initials`,' ',`e`.`First_Name`,' ',`e`.`Last_Name`) AS `Full_Name`,`e`.`NIC` AS `Employment_NIC`,`u`.`User_ID` AS `User_ID`,`jt`.`Title` AS `Title`,`pg`.`Pay_Grade_Level` AS `Pay_Grade_Level`,`lr`.`Start_Date` AS `Start_Date`,`lr`.`End_Date` AS `End_Date`,`lr`.`Reason` AS `Reason`,`lr`.`Status` AS `Request_Status`,concat(`s`.`Initials`,' ',`s`.`First_Name`,' ',`s`.`Last_Name`) AS `Supervisor_Full_Name`,`s`.`NIC` AS `Supervisor_NIC`,`jts`.`Title` AS `Supervisor_Title`,`b`.`Branch_ID` AS `Branch_ID`,`d`.`Dept_ID` AS `Dept_ID`,`o`.`Organization_ID` AS `Organization_ID` from ((((((((((`employee` `e` left join `employee_supervisor` `es` on((`es`.`Employee_ID` = `e`.`Employee_ID`))) left join `employee` `s` on((`s`.`Employee_ID` = `es`.`Supervisor_ID`))) left join `job_title` `jts` on((`s`.`Title_ID` = `jts`.`Title_ID`))) left join `user` `u` on((`u`.`Employee_ID` = `e`.`Employee_ID`))) left join `department` `d` on((`e`.`Dept_ID` = `d`.`Dept_ID`))) left join `branch` `b` on((`d`.`Branch_ID` = `b`.`Branch_ID`))) left join `organization` `o` on((`b`.`Organization_ID` = `o`.`Organization_ID`))) left join `leave_request` `lr` on((`u`.`User_ID` = `lr`.`User_ID`))) left join `pay_grade` `pg` on((`e`.`PayGrade_ID` = `pg`.`PayGrade_ID`))) left join `job_title` `jt` on((`e`.`Title_ID` = `jt`.`Title_ID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-30 23:40:17
