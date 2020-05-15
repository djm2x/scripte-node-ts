using Microsoft.EntityFrameworkCore;

namespace Model
{
    public partial class MyContext : DbContext
    {
        public MyContext(DbContextOptions<MyContext> options) : base(options) { }

        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity => 
{entity.HasKey(e => e.Id);
entity.Property(e => e.Id).ValueGeneratedOnAdd();
entity.Property(e => e.Name).IsRequired(false);
entity.Property(e => e.Date).IsRequired(false);
entity.Property(e => e.IsActive).IsRequired(false);
entity.Property(e => e.IdRole).IsRequired(false);
entity.HasOne(d => d.Role).WithMany(p => p.Users).HasForeignKey(d => d.IdRole);
entity.HasMany(d => d.Blogs).WithOne(p => p.User).HasForeignKey(d => d.IdUser).OnDelete(DeleteBehavior.NoAction);
});

modelBuilder.Entity<Role>(entity => 
{entity.HasKey(e => e.Id);
entity.Property(e => e.Id).ValueGeneratedOnAdd();
entity.Property(e => e.Name).IsRequired(false);
});

modelBuilder.Entity<Blog>(entity => 
{entity.HasKey(e => e.Id);
entity.Property(e => e.Id).ValueGeneratedOnAdd();
entity.Property(e => e.Title).IsRequired(false);
entity.Property(e => e.Discription).IsRequired(false);
entity.Property(e => e.ImageUrl).IsRequired(false);
entity.Property(e => e.Date).IsRequired(false);
entity.Property(e => e.IdUser).IsRequired(false);
entity.HasOne(d => d.User).WithMany(p => p.Blogs).HasForeignKey(d => d.IdUser);
entity.HasOne(d => d.Category).WithMany(p => p.Blogs).HasForeignKey(d => d.IdCategory);
});

modelBuilder.Entity<Category>(entity => 
{entity.HasKey(e => e.Id);
entity.Property(e => e.Id).ValueGeneratedOnAdd();
entity.Property(e => e.Name).IsRequired(false);
entity.HasMany(d => d.Blogs).WithOne(p => p.Category).HasForeignKey(d => d.IdCategory).OnDelete(DeleteBehavior.NoAction);
});




            modelBuilder
                .Users()
                ;
        }


        // partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
