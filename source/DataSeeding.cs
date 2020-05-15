using System;
using System.Collections.Generic;
using Bogus;
using Microsoft.EntityFrameworkCore;


// dotnet ef dbcontext scaffold 
// "data source=DESKTOP-3550K4L\HARMONY;database=rfid;user id=sa; password=123" 
// Microsoft.EntityFrameworkCore.SqlServer 
// -o Model 
// -c "RfidContext"

// dotnet add package Bogus
namespace Model
{
    public static class DataSeeding
    {
        public static int i = 50;
        public static string lang = "fr";

       

        public static ModelBuilder Users(this ModelBuilder modelBuilder)
        {
            int id = 1;
            
            var services = new[] { "DG", "DIPE", "DRSI/SBC", "DRSI/SAI"  };
            var fonctions = new[] { "Directeur", "Chef de departement","Assistant", "Cadre" };

            string name = "";
            var faker = new Faker<User>(DataSeeding.lang)
                .CustomInstantiator(f => new User { Id = id++ })
                .RuleFor(o => o.LastName, f => id - 1 != 1 ? name = f.Name.LastName() : "mourabit" )
                .RuleFor(o => o.FirstName, f => id - 1 != 1 ? f.Name.FirstName() : "mohamed")
                .RuleFor(o => o.Email, (f, u) => id - 1 != 1 ? $"{name}-{id}@angular.io" : "dj-m2x@hotmail.com")
                .RuleFor(o => o.Password, f => "123"/*f.Internet.Password(6)*/)
                .RuleFor(o => o.VerificationCode, (f, u) => "123")
                .RuleFor(o => o.EmailVerified, (f, u) => f.Random.Bool())
                .RuleFor(o => o.UserStatus, f => f.Random.Bool())
                .RuleFor(o => o.Role, f => id - 1 != 1 ? "user" : "admin")
                //
                .RuleFor(o => o.Matricule, f => f.Name.Prefix())
                .RuleFor(o => o.Service, f => f.PickRandom(services))
                .RuleFor(o => o.Fonction, f => f.PickRandom(fonctions))
                ;

            modelBuilder.Entity<User>().HasData(faker.Generate(20));

            return modelBuilder;
        }
    }
}