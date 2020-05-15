using System; 
using System.Collections.Generic; 
namespace Models 
 {public partial class User 
{public number Id { get; set; }
public string Name { get; set; }
public DateTime Date { get; set; }
public boolean IsActive { get; set; }
public number IdRole { get; set; }
public virtual Role Role { get; set; }
public virtual ICollection<Blog> Blogs { get; set; }
}
}
