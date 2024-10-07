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
INSERT INTO `branch` VALUES (1,'Main Branch','123 Main St','Sri Lanka',1),(2,'Finance Branch','456 Finance St','Sri Lanka',2),(3,'Creative Branch','789 Creative Blvd','Sri Lanka',3),(4,'Market Branch','101 Market Rd','Pakistan',4),(5,'Sales Branch','202 Sales St','Bangladesh',5),(6,'IT Branch','303 IT Center','Pakistan',6),(7,'Service Branch','404 Service Lane','Sri Lanka',7),(8,'Legal Branch','505 Legal Plaza','Pakistan',8),(9,'R&D Branch','606 Research Ave','Sri Lanka',9),(10,'HR Branch','707 HR Lane','Sri Lanka',10);
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classroom`
--

DROP TABLE IF EXISTS `classroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classroom` (
  `building` varchar(15) NOT NULL,
  `room_number` varchar(7) NOT NULL,
  `capacity` decimal(4,0) DEFAULT NULL,
  PRIMARY KEY (`building`,`room_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom`
--

LOCK TABLES `classroom` WRITE;
/*!40000 ALTER TABLE `classroom` DISABLE KEYS */;
/*!40000 ALTER TABLE `classroom` ENABLE KEYS */;
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
INSERT INTO `custom_field` VALUES (1,'Certification'),(2,'Awards'),(3,'Languages'),(4,'Skills'),(5,'Hobbies'),(6,'Projects'),(7,'Education'),(8,'Training'),(9,'Achievements'),(10,'Experience');
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
INSERT INTO `department` VALUES (1,'Engineering',1),(2,'Finance',2),(3,'R&D',3),(4,'Marketing',4),(5,'Sales',5),(6,'IT',6),(7,'Customer Service',7),(8,'Legal',8),(9,'Creative',9),(10,'Human Resources',10);
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
INSERT INTO `dependent_info` VALUES ('Bob Brown','3b1e2d70-3f65-5ffb-9d18-72b3453d9c6f','Child'),('Charlie Clark','4c2f3e80-4f76-6ggc-ae29-83c4564e0d7f','Parent'),('Diana Davis','5d3g4f90-5h87-7hhc-bf3a-94d5675f1e8g','Sibling'),('Frank Fisher','7f5i6h10-7j09-9jje-dh5c-b6f7897h3g0i','Child'),('Grace Garcia','8g6j7i20-8k1a-0kkf-ei6d-c7g8908i4h1j','Parent'),('Henry Harris','9h7k8j30-9l2b-1llg-fj7e-d8h9019j5k2k','Spouse'),('Irene Ingram','a8i9j040-a12c-2mmh-gk8f-e9i0120k6l3l','Sibling'),('Jack Johnson','b9j0k150-b23d-3nni-hl9g-f0j1231l7m4m','Child');
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
INSERT INTO `emergency_contact` VALUES ('3b1e2d70-3f65-5ffb-9d18-72b3453d9c6f','3b1e2d70-3f65-5ffb-9d18-72b3453d9c6f','Alice','Brown','2222222222','alice.brown@example.com','456 Finance St','Child'),('4c2f3e80-4f76-6ggc-ae29-83c4564e0d7f','4c2f3e80-4f76-6ggc-ae29-83c4564e0d7f','Charlie','Clark','3333333333','charlie.clark@example.com','789 Creative Blvd','Parent'),('5d3g4f90-5h87-7hhc-bf3a-94d5675f1e8g','5d3g4f90-5h87-7hhc-bf3a-94d5675f1e8g','Diana','Davis','4444444444','diana.davis@example.com','101 Market Rd','Sibling'),('7f5i6h10-7j09-9jje-dh5c-b6f7897h3g0i','7f5i6h10-7j09-9jje-dh5c-b6f7897h3g0i','Frank','Fisher','6666666666','frank.fisher@example.com','303 IT Center','Child'),('8g6j7i20-8k1a-0kkf-ei6d-c7g8908i4h1j','8g6j7i20-8k1a-0kkf-ei6d-c7g8908i4h1j','Grace','Garcia','7777777777','grace.garcia@example.com','404 Support Ave','Parent'),('9h7k8j30-9l2b-1llg-fj7e-d8h9019j5k2k','9h7k8j30-9l2b-1llg-fj7e-d8h9019j5k2k','Henry','Harris','8888888888','henry.harris@example.com','505 Development Dr','Spouse'),('a8i9j040-a12c-2mmh-gk8f-e9i0120k6l3l','a8i9j040-a12c-2mmh-gk8f-e9i0120k6l3l','Irene','Ingram','9999999999','irene.ingram@example.com','606 HR Blvd','Sibling'),('b9j0k150-b23d-3nni-hl9g-f0j1231l7m4m','b9j0k150-b23d-3nni-hl9g-f0j1231l7m4m','Jack','Johnson','0000000000','jack.johnson@example.com','707 Finance St','Child');
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
INSERT INTO `employee` VALUES ('3b1e2d70-3f65-5ffb-9d18-72b3453d9c6f','NIC002','A.B.','Alice','Brown','1985-02-15','Female','Married','2345678901','alice.brown@financehub.com','alice.brown@gmail.com','456 Finance St','22222222-2222-2222-2222-222222222222',1,2,2,2,'PF002'),('4c2f3e80-4f76-6ggc-ae29-83c4564e0d7f','NIC003','B.C.','Bob','Clark','1990-03-30','Male','Single','3456789012','bob.clark@innovativecreations.com','bob.clark@gmail.com','789 Creative Blvd','33333333-3333-3333-3333-333333333333',1,3,3,2,'PF003'),('5d3g4f90-5h87-7hhc-bf3a-94d5675f1e8g','NIC004','C.D.','Carol','Davis','1982-04-25','Female','Married','4567890123','carol.davis@marketingmasters.com','carol.davis@gmail.com','101 Market Rd','44444444-4444-4444-4444-444444444444',1,4,4,2,'PF004'),('7f5i6h10-7j09-9jje-dh5c-b6f7897h3g0i','NIC006','E.F.','Eva','Fisher','1992-06-20','Female','Single','6789012345','eva.fisher@itwizards.com','eva.fisher@gmail.com','303 IT Center','66666666-6666-6666-6666-666666666666',1,3,2,2,'PF006'),('8g6j7i20-8k1a-0kkf-ei6d-c7g8908i4h1j','NIC007','F.G.','Frank','Garcia','1987-07-15','Male','Married','7890123456','frank.garcia@customerserviceco.com','frank.garcia@gmail.com','404 Service Lane','77777777-7777-7777-7777-777777777777',1,3,3,2,'PF007'),('9h7k8j30-9l2b-1llg-fj7e-d8h9019j5k2k','NIC008','G.H.','Grace','Harris','1984-08-22','Female','Single','8901234567','grace.harris@legalexperts.com','grace.harris@gmail.com','505 Legal Plaza','88888888-8888-8888-8888-888888888888',1,2,4,2,'PF008'),('a8i9j040-a12c-2mmh-gk8f-e9i0120k6l3l','NIC009','H.I.','Henry','Ingram','1995-09-30','Male','Married','9012345678','henry.ingram@rdinnovators.com','henry.ingram@gmail.com','606 Research Ave','99999999-9999-9999-9999-999999999999',1,2,2,1,'PF009'),('b9j0k150-b23d-3nni-hl9g-f0j1231l7m4m','NIC010','I.J.','Irene','Johnson','1983-10-05','Female','Single','0123456789','irene.johnson@hrhub.com','irene.johnson@gmail.com','707 HR Lane','00000000-0000-0000-0000-000000000000',1,3,3,1,'PF010');
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
INSERT INTO `employee_custom_field` VALUES (2,'3b1e2d70-3f65-5ffb-9d18-72b3453d9c6f','Data2'),(3,'4c2f3e80-4f76-6ggc-ae29-83c4564e0d7f','Data3'),(4,'5d3g4f90-5h87-7hhc-bf3a-94d5675f1e8g','Data4'),(6,'7f5i6h10-7j09-9jje-dh5c-b6f7897h3g0i','Data6'),(7,'8g6j7i20-8k1a-0kkf-ei6d-c7g8908i4h1j','Data7'),(8,'9h7k8j30-9l2b-1llg-fj7e-d8h9019j5k2k','Data8'),(9,'a8i9j040-a12c-2mmh-gk8f-e9i0120k6l3l','Data9'),(10,'b9j0k150-b23d-3nni-hl9g-f0j1231l7m4m','Data10');
/*!40000 ALTER TABLE `employee_custom_field` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_pic`
--

DROP TABLE IF EXISTS `employee_pic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_pic` (
  `Pic_ID` char(36) NOT NULL,
  `Path` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Pic_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_pic`
--

LOCK TABLES `employee_pic` WRITE;
/*!40000 ALTER TABLE `employee_pic` DISABLE KEYS */;
INSERT INTO `employee_pic` VALUES ('00000000-0000-0000-0000-000000000000','/images/emp10.jpg'),('11111111-1111-1111-1111-111111111111','/images/emp1.jpg'),('22222222-2222-2222-2222-222222222222','/images/emp2.jpg'),('33333333-3333-3333-3333-333333333333','/images/emp3.jpg'),('44444444-4444-4444-4444-444444444444','/images/emp4.jpg'),('55555555-5555-5555-5555-555555555555','/images/emp5.jpg'),('66666666-6666-6666-6666-666666666666','/images/emp6.jpg'),('77777777-7777-7777-7777-777777777777','/images/emp7.jpg'),('88888888-8888-8888-8888-888888888888','/images/emp8.jpg'),('99999999-9999-9999-9999-999999999999','/images/emp9.jpg');
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
INSERT INTO `employee_supervisor` VALUES ('5d3g4f90-5h87-7hhc-bf3a-94d5675f1e8g','3b1e2d70-3f65-5ffb-9d18-72b3453d9c6f'),('4c2f3e80-4f76-6ggc-ae29-83c4564e0d7f','5d3g4f90-5h87-7hhc-bf3a-94d5675f1e8g'),('8g6j7i20-8k1a-0kkf-ei6d-c7g8908i4h1j','5d3g4f90-5h87-7hhc-bf3a-94d5675f1e8g'),('9h7k8j30-9l2b-1llg-fj7e-d8h9019j5k2k','7f5i6h10-7j09-9jje-dh5c-b6f7897h3g0i'),('a8i9j040-a12c-2mmh-gk8f-e9i0120k6l3l','9h7k8j30-9l2b-1llg-fj7e-d8h9019j5k2k'),('b9j0k150-b23d-3nni-hl9g-f0j1231l7m4m','9h7k8j30-9l2b-1llg-fj7e-d8h9019j5k2k');
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
  `No-Pay` int DEFAULT NULL,
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
INSERT INTO `leave_data_balance` VALUES ('3b1e2d70-3f65-5ffb-9d18-72b3453d9c6f',2024,15,6,0,2,23),('4c2f3e80-4f76-6ggc-ae29-83c4564e0d7f',2024,18,4,12,1,35),('5d3g4f90-5h87-7hhc-bf3a-94d5675f1e8g',2024,22,3,8,0,33),('7f5i6h10-7j09-9jje-dh5c-b6f7897h3g0i',2024,25,2,5,4,36),('8g6j7i20-8k1a-0kkf-ei6d-c7g8908i4h1j',2024,12,8,0,0,20),('9h7k8j30-9l2b-1llg-fj7e-d8h9019j5k2k',2024,20,5,6,3,34),('a8i9j040-a12c-2mmh-gk8f-e9i0120k6l3l',2024,17,6,0,2,25),('b9j0k150-b23d-3nni-hl9g-f0j1231l7m4m',2024,30,0,4,1,35);
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
  `Leave_Type` enum('Annual','Casual','Maternity','No-Pay') NOT NULL,
  `Start_Date` date NOT NULL,
  `End_Date` date NOT NULL,
  `Reason` varchar(255) NOT NULL,
  `Status` enum('Approve','Reject') DEFAULT NULL,
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
INSERT INTO `leave_request` VALUES ('10j1k2lm-nopq-3r4s-5t6u-7v8w9x0y1z','b9j0k150-b23d-3nni-hl9g-f0j1231l7m4m','Annual','2024-10-01','2024-10-10','Vacation','Approve'),('2b3c4d5e-6f7g-8h9i-10j1-klm2nopq3r','3b1e2d70-3f65-5ffb-9d18-72b3453d9c6f','Casual','2024-02-01','2024-02-05','Personal','Reject'),('3c4d5e6f-7g8h-9i10-jkl1-mnop2q3r4s','4c2f3e80-4f76-6ggc-ae29-83c4564e0d7f','Maternity','2024-03-01','2024-03-20','Childbirth','Approve'),('4d5e6f7g-8h9i-10j1-klm2-nopq3r4s5t','5d3g4f90-5h87-7hhc-bf3a-94d5675f1e8g','Annual','2024-04-01','2024-04-10','Vacation','Approve'),('6f7g8h9i-10j1-klm2-nopq-3r4s5t6u7v','7f5i6h10-7j09-9jje-dh5c-b6f7897h3g0i','No-Pay','2024-06-01','2024-06-10','Unpaid Leave','Approve'),('7g8h9i10-j1kl-mnop-q3r4-s5t6u7v8w9','8g6j7i20-8k1a-0kkf-ei6d-c7g8908i4h1j','Maternity','2024-07-01','2024-07-15','Childbirth','Reject'),('8h9i10j1-k2lm-nopq-3r4s-5t6u7v8w9x','9h7k8j30-9l2b-1llg-fj7e-d8h9019j5k2k','Annual','2024-08-01','2024-08-05','Vacation','Approve'),('9i10j1k2-lmno-pq3r-4s5t-6u7v8w9x0y','a8i9j040-a12c-2mmh-gk8f-e9i0120k6l3l','Casual','2024-09-01','2024-09-03','Personal','Reject');
/*!40000 ALTER TABLE `leave_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `User_ID` char(36) NOT NULL,
  `Data` varchar(255) NOT NULL,
  `DateTime` datetime NOT NULL,
  KEY `FK_N_User_ID_idx` (`User_ID`),
  CONSTRAINT `FK_N_User_ID` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES ('2a0f1c90-2e54-4eeb-9f07-61f2342f8b5e','PLEASE SAVE CURRENT STATE OD THE DATA BASE','2024-01-15 08:30:00'),('3b1e2d70-3f65-5ffb-9d18-72b3453d9c6f','New leave request received','2024-02-06 09:00:00'),('4c2f3e80-4f76-6ggc-ae29-83c4564e0d7f','Casual leave request rejected','2024-03-21 10:15:00'),('5d3g4f90-5h87-7hhc-bf3a-94d5675f1e8g','Maternity leave request approved','2024-04-12 11:45:00'),('7f5i6h10-7j09-9jje-dh5c-b6f7897h3g0i','Emergency contact information updated','2024-06-16 15:30:00'),('8g6j7i20-8k1a-0kkf-ei6d-c7g8908i4h1j','User profile updated','2024-07-20 16:00:00'),('9h7k8j30-9l2b-1llg-fj7e-d8h9019j5k2k','New notification from HR','2024-08-25 17:20:00'),('a8i9j040-a12c-2mmh-gk8f-e9i0120k6l3l','Leave request status updated','2024-09-12 18:00:00'),('b9j0k150-b23d-3nni-hl9g-f0j1231l7m4m','New message in your inbox','2024-10-02 19:10:00');
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
INSERT INTO `organization` VALUES (1,'Tech Solutions Ltd','REG001','123 Tech Avenue'),(2,'Finance Hub Inc','REG002','456 Finance Street'),(3,'Innovative Creations','REG003','789 Creative Blvd'),(4,'Marketing Masters','REG004','101 Market Road'),(5,'Sales Pros Ltd','REG005','202 Sales Street'),(6,'IT Wizards Inc','REG006','303 IT Center'),(7,'Customer Service Co','REG007','404 Service Lane'),(8,'Legal Experts Ltd','REG008','505 Legal Plaza'),(9,'R&D Innovators','REG009','606 Research Ave'),(10,'Human Resources Hub','REG010','707 HR Lane');
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
  `No-Pay` int DEFAULT NULL,
  PRIMARY KEY (`PayGrade_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pay_grade`
--

LOCK TABLES `pay_grade` WRITE;
/*!40000 ALTER TABLE `pay_grade` DISABLE KEYS */;
INSERT INTO `pay_grade` VALUES (1,'Level-1',50,10,5,2),(2,'Level-2',60,12,6,3),(3,'Level-3',70,14,7,4),(4,'Level-4',80,16,8,5);
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
INSERT INTO `user` VALUES ('2a0f1c90-2e54-4eeb-9f07-61f2342f8b5e','krishmal','$2b$10$MEMR7ejSXGqriDgkWFRbYesVZm4A0.DDsAWSAau2sVnUWL7dxpOiq',NULL,'Admin User'),('3b1e2d70-3f65-5ffb-9d18-72b3453d9c6f','dasun','$2b$10$MEMR7ejSXGqriDgkWFRbYesVZm4A0.DDsAWSAau2sVnUWL7dxpOiq','3b1e2d70-3f65-5ffb-9d18-72b3453d9c6f','HR Manager'),('4c2f3e80-4f76-6ggc-ae29-83c4564e0d7f','chehan','$2b$10$MEMR7ejSXGqriDgkWFRbYesVZm4A0.DDsAWSAau2sVnUWL7dxpOiq','4c2f3e80-4f76-6ggc-ae29-83c4564e0d7f','Employee'),('5d3g4f90-5h87-7hhc-bf3a-94d5675f1e8g','nipun','$2b$10$MEMR7ejSXGqriDgkWFRbYesVZm4A0.DDsAWSAau2sVnUWL7dxpOiq','5d3g4f90-5h87-7hhc-bf3a-94d5675f1e8g','Second Manager'),('7f5i6h10-7j09-9jje-dh5c-b6f7897h3g0i','gunawardana','$2b$10$MEMR7ejSXGqriDgkWFRbYesVZm4A0.DDsAWSAau2sVnUWL7dxpOiq','7f5i6h10-7j09-9jje-dh5c-b6f7897h3g0i','HR Manager'),('8g6j7i20-8k1a-0kkf-ei6d-c7g8908i4h1j','sachintha','$2b$10$MEMR7ejSXGqriDgkWFRbYesVZm4A0.DDsAWSAau2sVnUWL7dxpOiq','8g6j7i20-8k1a-0kkf-ei6d-c7g8908i4h1j','Employee'),('9h7k8j30-9l2b-1llg-fj7e-d8h9019j5k2k','gamage','$2b$10$MEMR7ejSXGqriDgkWFRbYesVZm4A0.DDsAWSAau2sVnUWL7dxpOiq','9h7k8j30-9l2b-1llg-fj7e-d8h9019j5k2k','Second Manager'),('a8i9j040-a12c-2mmh-gk8f-e9i0120k6l3l','sankalpa','$2b$10$MEMR7ejSXGqriDgkWFRbYesVZm4A0.DDsAWSAau2sVnUWL7dxpOiq','a8i9j040-a12c-2mmh-gk8f-e9i0120k6l3l','Employee'),('b9j0k150-b23d-3nni-hl9g-f0j1231l7m4m','madushan','$2b$10$MEMR7ejSXGqriDgkWFRbYesVZm4A0.DDsAWSAau2sVnUWL7dxpOiq','b9j0k150-b23d-3nni-hl9g-f0j1231l7m4m','Employee');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'hrms'
--

--
-- Dumping routines for database 'hrms'
--
/*!50003 DROP PROCEDURE IF EXISTS `GetEmployeeDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetEmployeeDetails`(IN emp_id VARCHAR(36))
BEGIN
    SELECT Employee_ID, NIC, Initials, First_Name, Last_Name, Date_of_Birth, Gender, Marital_Status, Phone, 
           Email_Work, Email_Private, Address, Path AS IMG_DIR, Dept_Name, Title, Pay_Grade_Level, 
           Employment_Stat_Type, PF_Number
    FROM hrms.employee
    LEFT JOIN hrms.department ON hrms.employee.Dept_ID = hrms.department.Dept_ID
    LEFT JOIN hrms.job_title ON hrms.employee.Title_ID = hrms.job_title.Title_ID
    LEFT JOIN hrms.pay_grade ON hrms.employee.PayGrade_ID = hrms.pay_grade.PayGrade_ID
    LEFT JOIN hrms.employment_status ON hrms.employee.Employment_Stat_ID = hrms.employment_status.Employment_Stat_ID
    LEFT JOIN hrms.employee_pic ON hrms.employee.Pic_ID = hrms.employee_pic.Pic_ID
    WHERE Employee_ID = emp_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetUserNotifications` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetUserNotifications`(IN user_id VARCHAR(36))
BEGIN
    SELECT Data, DateTime
    FROM hrms.notification n
    WHERE n.User_ID = user_id
    ORDER BY n.DateTime ASC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-07 11:00:50
