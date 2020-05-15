using System; 
using System.Collections.Generic; 
namespace Models 
 {public partial class User 
{public number Id { get; set; }
public string Name { get; set; }
public DateTime Date { get; set; }
public boolean Isactive { get; set; }
public number Idrole { get; set; }
public virtual Role Role { get; set; }
public virtual ICollection<> Blogs { get; set; }
}
}
